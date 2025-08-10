#!/bin/bash
#
# This script deploys the services defined in deploye.yml to the ECS cluster.
# It requires the output of the create_ecs_infra.sh script as input.
#
# Usage:
# ./deploy-services.sh <VPC_ID> <PUBLIC_SUBNET_IDS> <ALB_SG_ID> <SERVICE_SG_ID> <ECR_BASE_URL> <ACCOUNT_ID>
#

set -e

# --- Configuration ---
STACK_NAME="ecs-services-stack"
TEMPLATE_FILE="deploye.yml"

# --- Parameters ---
VPC_ID=$1
PUBLIC_SUBNET_IDS=$2
ALB_SG_ID=$3
SERVICE_SG_ID=$4
ECR_BASE_URL=$5
ACCOUNT_ID=$6

if [ -z "$VPC_ID" ] || [ -z "$PUBLIC_SUBNET_IDS" ] || [ -z "$ALB_SG_ID" ] || [ -z "$SERVICE_SG_ID" ] || [ -z "$ECR_BASE_URL" ] || [ -z "$ACCOUNT_ID" ]; then
    echo "Usage: $0 <VPC_ID> <PUBLIC_SUBNET_IDS> <ALB_SG_ID> <SERVICE_SG_ID> <ECR_BASE_URL> <ACCOUNT_ID>"
    exit 1
fi

# Split public subnets into two
PUBLIC_SUBNET_1=$(echo "$PUBLIC_SUBNET_IDS" | cut -d, -f1)
PUBLIC_SUBNET_2=$(echo "$PUBLIC_SUBNET_IDS" | cut -d, -f2)


# --- Deploy CloudFormation Stack ---
echo ">>> Deploying CloudFormation stack '$STACK_NAME'..."
aws cloudformation deploy \
    --template-file "$TEMPLATE_FILE" \
    --stack-name "$STACK_NAME" \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides \
        VpcId="$VPC_ID" \
        PublicSubnet1="$PUBLIC_SUBNET_1" \
        PublicSubnet2="$PUBLIC_SUBNET_2" \
        AlbSecurityGroup="$ALB_SG_ID" \
        EcsServiceSecurityGroup="$SERVICE_SG_ID" \
        EcrBaseUrl="$ECR_BASE_URL" \
        AccountId="$ACCOUNT_ID"

echo "✅ CloudFormation stack '$STACK_NAME' deployed successfully."
