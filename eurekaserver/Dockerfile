# Stage 1: Build the application using Maven
FROM maven:3.8-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Build the project, creating the executable JAR. Skip tests to speed up the build.
RUN mvn clean package -DskipTests

# Stage 2: Create the final, lightweight image
# Stage 2: Create the final, lightweight image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar
# Expose the port the application runs on
EXPOSE 8761
# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]