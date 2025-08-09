# Employee Management System

This project is an Employee Management System built with Angular for the frontend and Spring Boot for the backend. It features OAuth2 authentication using Google, GitHub, and Facebook, allowing users to log in securely. After successful authentication, users can navigate to the employee CRUD application.

## Project Structure

```
employee-management-system
├── frontend-angular
│   ├── src
│   │   ├── app
│   │   │   ├── components
│   │   │   │   ├── login
│   │   │   │   │   └── login.component.ts
│   │   │   │   └── employee-crud
│   │   │   │       └── employee-crud.component.ts
│   │   │   ├── services
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── employee.service.ts
│   │   │   ├── app-routing.module.ts
│   │   │   └── app.component.ts
│   │   └── main.ts
│   ├── angular.json
│   └── package.json
├── backend-springboot
│   ├── src
│   │   └── main
│   │       ├── java
│   │       │   └── com
│   │       │       └── example
│   │       │           └── app
│   │       │               ├── config
│   │       │               │   └── SecurityConfig.java
│   │       │               ├── controller
│   │       │               │   └── EmployeeController.java
│   │       │               ├── model
│   │       │               │   └── Employee.java
│   │       │               ├── repository
│   │       │               │   └── EmployeeRepository.java
│   │       │               └── Application.java
│   │       └── resources
│   │           └── application.properties
│   └── pom.xml
└── README.md
```

## Features

- **OAuth2 Authentication**: Users can log in using their Google, GitHub, or Facebook accounts.
- **Employee CRUD Operations**: Users can create, read, update, and delete employee records.

## Setup Instructions

### Frontend

1. Navigate to the `frontend-angular` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the Angular application:
   ```
   ng serve
   ```

### Backend

1. Navigate to the `backend-springboot` directory.
2. Build the project using Maven:
   ```
   mvn clean install
   ```
3. Run the Spring Boot application:
   ```
   mvn spring-boot:run
   ```

## Usage

- Access the application at `http://localhost:4200`.
- Use the login screen to authenticate via OAuth2.
- After logging in, navigate to the employee management section to manage employee records.

## Technologies Used

- Angular
- Spring Boot
- OAuth2
- TypeScript
- Java

## License

This project is licensed under the MIT License.