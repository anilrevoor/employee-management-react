# Employee Management Portal

A responsive Employee Management Portal built using React, TypeScript, Axios, and Material UI. The application communicates with a Spring Boot REST API for employee management.

## Technologies Used

* React 17
* TypeScript
* Axios
* Material UI
* React Router
* Java 21
* Spring Boot
* Spring Data JPA
* H2 / MySQL
* REST API

## Features

* View all employees
* Add a new employee
* Edit an existing employee
* Delete an employee
* Client-side input validation
* Email format validation
* Success and error messages
* Responsive user interface
* REST API integration using Axios
* Navigation using React Router

## Project Structure

```text
cmanagement-portal
├── public
├── src
│   ├── components
│   ├── pages
│   │   ├── EmployeeList
│   │   ├── AddEmployee
│   │   └── EditEmployee
│   ├── services
│   │   └── employeeService.ts
│   ├── types
│   │   └── Employee.ts
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── package-lock.json
└── README.md
```

## Backend API

The React application communicates with the Spring Boot backend.

Base URL:

```text
http://localhost:8080/api/employees
```

### Get Employees

```text
GET /api/employees
```

Returns all employees.

### Get Employee

```text
GET /api/employees/{id}
```

Returns an employee by ID.

### Create Employee

```text
POST /api/employees
```

Example request:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "department": "IT"
}
```

### Update Employee

```text
PUT /api/employees/{id}
```

Example request:

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "department": "Engineering"
}
```

### Delete Employee

```text
DELETE /api/employees/{id}
```

Deletes the employee with the specified ID.

## Prerequisites

* Node.js
* npm
* Java 21
* Spring Boot backend running on port 8080

## Installation

Open a command prompt in the project directory:

```text
C:\softwares\employee-management\cmanagement-portal
```

Install dependencies:

```bash
npm install
```

## Running the Application

Start the React application:

```bash
npm start
```

The application will normally be available at:

```text
http://localhost:3000
```

Make sure the Spring Boot backend is running before using employee management features.

## Testing

Run the React unit tests:

```bash
npm test -- --watchAll=false
```

The project currently includes a test verifying that the Employee Management Portal is rendered successfully.

## Production Build

Create an optimized production build:

```bash
npm run build
```

The generated production files are placed in:

```text
build/
```

## Validation

The application validates:

* First Name is required
* Last Name is required
* Email is required
* Email must have a valid format
* Department is required
* An employee must be selected before updating

## Browser Access

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:8080
```

## Notes

The frontend is configured to communicate with the Spring Boot API running locally on port 8080.

CORS is configured in the backend to allow requests from:

```text
http://localhost:3000
```
