#!/bin/bash
#
# This script provisions a foundational AWS ECS infrastructure.
# It creates a VPC, Subnets, an ECS Cluster, an Application Load Balancer,
# and the necessary IAM roles and Security Groups.
#
# WARNING: This script will provision AWS resources that will incur costs.
#

set -e # Exit immediately if a command exits with a non-zero status.

# --- Configuration ---
export AWS_REGION="us-east-1"
export CLUSTER_NAME="my-ecs-cluster"
export VPC_NAME="my-ecs-vpc"
export VPC_CIDR="10.0.0.0/16"
export PUBLIC_SUBNET_1_CIDR="10.0.1.0/24"
export PUBLIC_SUBNET_2_CIDR="10.0.2.0/24"
export PRIVATE_SUBNET_1_CIDR="10.0.3.0/24"
export PRIVATE_SUBNET_2_CIDR="10.0.4.0/24"
export IAM_EXECUTION_ROLE_NAME="ecsTaskExecutionRole"

# Get Availability Zones for the region
AZ_1=$(aws ec2 describe-availability-zones --region "$AWS_REGION" --query "AvailabilityZones[0].ZoneName" --output text)
AZ_2=$(aws ec2 describe-availability-zones --region "$AWS_REGION" --query "AvailabilityZones[1].ZoneName" --output text)

echo ">>> Using Availability Zones: $AZ_1 and $AZ_2"

# --- Step 1: Create VPC and Subnets ---
echo ">>> Step 1: Creating VPC '$VPC_NAME'..."
VPC_ID=$(aws ec2 create-vpc --cidr-block "$VPC_CIDR" --query 'Vpc.VpcId' --output text)
aws ec2 create-tags --resources "$VPC_ID" --tags "Key=Name,Value=$VPC_NAME"
aws ec2 modify-vpc-attribute --vpc-id "$VPC_ID" --enable-dns-support "{\"Value\":true}"
aws ec2 modify-vpc-attribute --vpc-id "$VPC_ID" --enable-dns-hostnames "{\"Value\":true}"
echo "✅ VPC '$VPC_NAME' created with ID: $VPC_ID"

echo ">>> Creating Subnets..."
PUBLIC_SUBNET_1_ID=$(aws ec2 create-subnet --vpc-id "$VPC_ID" --cidr-block "$PUBLIC_SUBNET_1_CIDR" --availability-zone "$AZ_1" --query 'Subnet.SubnetId' --output text)
aws ec2 create-tags --resources "$PUBLIC_SUBNET_1_ID" --tags "Key=Name,Value=${VPC_NAME}-public-1"
PUBLIC_SUBNET_2_ID=$(aws ec2 create-subnet --vpc-id "$VPC_ID" --cidr-block "$PUBLIC_SUBNET_2_CIDR" --availability-zone "$AZ_2" --query 'Subnet.SubnetId' --output text)
aws ec2 create-tags --resources "$PUBLIC_SUBNET_2_ID" --tags "Key=Name,Value=${VPC_NAME}-public-2"

PRIVATE_SUBNET_1_ID=$(aws ec2 create-subnet --vpc-id "$VPC_ID" --cidr-block "$PRIVATE_SUBNET_1_CIDR" --availability-zone "$AZ_1" --query 'Subnet.SubnetId' --output text)
aws ec2 create-tags --resources "$PRIVATE_SUBNET_1_ID" --tags "Key=Name,Value=${VPC_NAME}-private-1"
PRIVATE_SUBNET_2_ID=$(aws ec2 create-subnet --vpc-id "$VPC_ID" --cidr-block "$PRIVATE_SUBNET_2_CIDR" --availability-zone "$AZ_2" --query 'Subnet.SubnetId' --output text)
aws ec2 create-tags --resources "$PRIVATE_SUBNET_2_ID" --tags "Key=Name,Value=${VPC_NAME}-private-2"
echo "✅ Subnets created."

# --- Step 2: Create Internet Gateway and Route Tables ---
echo ">>> Step 2: Creating Internet Gateway and routing..."
IGW_ID=$(aws ec2 create-internet-gateway --query 'InternetGateway.InternetGatewayId' --output text)
aws ec2 create-tags --resources "$IGW_ID" --tags "Key=Name,Value=${VPC_NAME}-igw"
aws ec2 attach-internet-gateway --vpc-id "$VPC_ID" --internet-gateway-id "$IGW_ID"

PUBLIC_RT_ID=$(aws ec2 create-route-table --vpc-id "$VPC_ID" --query 'RouteTable.RouteTableId' --output text)
aws ec2 create-tags --resources "$PUBLIC_RT_ID" --tags "Key=Name,Value=${VPC_NAME}-public-rt"
aws ec2 create-route --route-table-id "$PUBLIC_RT_ID" --destination-cidr-block 0.0.0.0/0 --gateway-id "$IGW_ID"
aws ec2 associate-route-table --subnet-id "$PUBLIC_SUBNET_1_ID" --route-table-id "$PUBLIC_RT_ID"
aws ec2 associate-route-table --subnet-id "$PUBLIC_SUBNET_2_ID" --route-table-id "$PUBLIC_RT_ID"
echo "✅ Internet Gateway and public route table configured."

# --- Step 3: Create NAT Gateway ---
echo ">>> Step 3: Creating NAT Gateway..."
EIP_ALLOC_ID=$(aws ec2 allocate-address --domain vpc --query 'AllocationId' --output text)
NAT_GW_ID=$(aws ec2 create-nat-gateway --subnet-id "$PUBLIC_SUBNET_1_ID" --allocation-id "$EIP_ALLOC_ID" --query 'NatGateway.NatGatewayId' --output text)
aws ec2 create-tags --resources "$NAT_GW_ID" --tags "Key=Name,Value=${VPC_NAME}-nat-gw"
echo "--> Waiting for NAT Gateway to become available..."
aws ec2 wait nat-gateway-available --nat-gateway-ids "$NAT_GW_ID"

PRIVATE_RT_ID=$(aws ec2 create-route-table --vpc-id "$VPC_ID" --query 'RouteTable.RouteTableId' --output text)
aws ec2 create-tags --resources "$PRIVATE_RT_ID" --tags "Key=Name,Value=${VPC_NAME}-private-rt"
aws ec2 create-route --route-table-id "$PRIVATE_RT_ID" --destination-cidr-block 0.0.0.0/0 --nat-gateway-id "$NAT_GW_ID"
aws ec2 associate-route-table --subnet-id "$PRIVATE_SUBNET_1_ID" --route-table-id "$PRIVATE_RT_ID"
aws ec2 associate-route-table --subnet-id "$PRIVATE_SUBNET_2_ID" --route-table-id "$PRIVATE_RT_ID"
echo "✅ NAT Gateway and private route table configured."

# --- Step 4: Create Security Groups ---
echo ">>> Step 4: Creating Security Groups..."
ALB_SG_ID=$(aws ec2 create-security-group --group-name "${VPC_NAME}-alb-sg" --description "ALB Security Group" --vpc-id "$VPC_ID" --query 'GroupId' --output text)
aws ec2 authorize-security-group-ingress --group-id "$ALB_SG_ID" --protocol tcp --port 80 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id "$ALB_SG_ID" --protocol tcp --port 443 --cidr 0.0.0.0/0

SERVICE_SG_ID=$(aws ec2 create-security-group --group-name "${VPC_NAME}-service-sg" --description "ECS Service Security Group" --vpc-id "$VPC_ID" --query 'GroupId' --output text)
aws ec2 authorize-security-group-ingress --group-id "$SERVICE_SG_ID" --protocol all --source-group "$ALB_SG_ID"
echo "✅ Security Groups created."

# --- Step 5: Create Application Load Balancer ---
echo ">>> Step 5: Creating Application Load Balancer..."
ALB_ARN=$(aws elbv2 create-load-balancer --name "${VPC_NAME}-alb" --type application --subnets "$PUBLIC_SUBNET_1_ID" "$PUBLIC_SUBNET_2_ID" --security-groups "$ALB_SG_ID" --query 'LoadBalancers[0].LoadBalancerArn' --output text)
echo "✅ ALB created with ARN: $ALB_ARN"

# --- Step 6: Create ECS Cluster ---
echo ">>> Step 6: Creating ECS Cluster..."
aws ecs create-cluster --cluster-name "$CLUSTER_NAME"
echo "✅ ECS Cluster '$CLUSTER_NAME' created."

# --- Step 7: Create IAM Role for ECS Tasks ---
echo ">>> Step 7: Creating IAM Role for ECS Task Execution..."
cat > ecs-task-execution-assume-role.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

aws iam create-role --role-name "$IAM_EXECUTION_ROLE_NAME" --assume-role-policy-document file://ecs-task-execution-assume-role.json || echo "IAM role '$IAM_EXECUTION_ROLE_NAME' already exists. Skipping creation."
aws iam attach-role-policy --role-name "$IAM_EXECUTION_ROLE_NAME" --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
rm ecs-task-execution-assume-role.json
echo "✅ IAM Role '$IAM_EXECUTION_ROLE_NAME' configured."

echo "---"
echo "🚀 ECS Infrastructure script finished successfully! ---"
echo ""
echo "Outputs:"
echo "VPC_ID=$VPC_ID"
echo "PUBLIC_SUBNET_IDS=$PUBLIC_SUBNET_1_ID,$PUBLIC_SUBNET_2_ID"
echo "PRIVATE_SUBNET_IDS=$PRIVATE_SUBNET_1_ID,$PRIVATE_SUBNET_2_ID"
echo "ALB_SG_ID=$ALB_SG_ID"
echo "SERVICE_SG_ID=$SERVICE_SG_ID"
echo "ALB_ARN=$ALB_ARN"
echo "CLUSTER_NAME=$CLUSTER_NAME"
echo "---"
