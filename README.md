# CManagement Portal

## Overview

CManagement Portal is the React frontend application for the Employee Management system.

It provides a user interface for employee management, authentication, adding employees, editing employees, deleting employees, notifications, and state management.

## Technology Stack

* React 17.0.2
* TypeScript
* React Router DOM 5.3.4
* Material UI 5.15.20
* Axios 0.27.2
* Redux Toolkit
* React Redux
* Create React App

## Application URL

Frontend:

`http://localhost:3000`

## Available Pages

| Page          | URL      |
| ------------- | -------- |
| Employee List | `/`      |
| Add Employee  | `/add`   |
| Edit Employee | `/edit`  |
| Login         | `/login` |

## Application Flow

```text
User
 |
 v
React Frontend :3000
 |
 v
Spring Cloud Gateway :8081
 |
 v
Spring Boot Backend :8080
 |
 v
Database
```

## Authentication

The frontend uses JWT authentication.

Login flow:

```text
Login Page
     |
     v
POST /api/v1/auth/login
     |
     v
JWT Token + Role
     |
     v
localStorage
     |
     v
Protected API Requests
```

The JWT token is sent with API requests using:

```text
Authorization: Bearer <JWT_TOKEN>
```

Logout removes the authentication information from localStorage.

## Employee Management

The frontend provides functionality to:

* View employees
* Add employees
* Edit employees
* Delete employees
* Display notifications
* Handle API errors

## Redux Toolkit

Redux Toolkit is used for centralized employee state management.

The employee Redux slice handles:

* Fetch employees
* Add employee
* Update employee
* Delete employee
* Loading state
* Error state

Asynchronous API operations are handled using Redux Toolkit async actions.

## Reusable Components

The application uses reusable React concepts including:

* Reusable components
* Custom hooks
* React Context
* Notification component
* Shared application state
* API service functions

## Axios

Axios is used for communication with the backend REST APIs.

Example API flow:

```text
React Component
      |
      v
Redux Action
      |
      v
Axios API Call
      |
      v
Gateway
      |
      v
Spring Boot Backend
```

## Backend URLs

Direct backend:

`http://localhost:8080`

Gateway:

`http://localhost:8081`

Versioned employee API:

`http://localhost:8081/api/v1/employees`

## Testing

Run frontend tests:

```bash
npm test
```

The application includes React component testing.

## Production Build

Create a production build:

```bash
npm run build
```

The generated production files are available under:

```text
build/
```

## Development Environment

The existing project environment uses:

* Node.js 13.14.0
* npm 6.14.4

The current dependency versions should be kept stable unless a deliberate upgrade is required.

## Architecture

```text
+----------------------------+
| React Employee Portal      |
| http://localhost:3000      |
+-------------+--------------+
              |
              v
+----------------------------+
| Spring Cloud Gateway       |
| http://localhost:8081      |
+-------------+--------------+
              |
              v
+----------------------------+
| Spring Boot Backend        |
| http://localhost:8080      |
+-------------+--------------+
              |
              v
+----------------------------+
| H2 Database                |
+----------------------------+
```

## Main Features

* Employee listing
* Add employee
* Edit employee
* Delete employee
* JWT login
* Logout
* Role-based UI behavior
* Redux Toolkit state management
* Async API calls
* Reusable components
* Context API
* Notifications
* Error handling
* Responsive Material UI interface

## Project Structure

Typical structure:

```text
cmanagement-portal/
 |
 +-- src/
 |    |
 |    +-- components/
 |    +-- pages/
 |    +-- hooks/
 |    +-- context/
 |    +-- redux/
 |    +-- services/
 |    +-- App.tsx
 |    +-- index.tsx
 |
 +-- public/
 +-- package.json
```

## Running the Application

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm start
```

Open:

`http://localhost:3000`

## Complete System

```text
                 React Frontend
                     :3000
                       |
                       v
              Spring Cloud Gateway
                     :8081
                       |
                       v
              Spring Boot Backend
                     :8080
                       |
                       v
                  H2 Database

              Spring Cloud Config
                     :8888
```
