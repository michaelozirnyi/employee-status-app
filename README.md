# Employee Status Management System

A React application for managing employee statuses with a Node.js/Express backend. The client is built with TypeScript.

## Features

- View a list of all employees
- Filter employees by status
- Search employees by name
- Update employee status
- Add new employees (UI only, no actual creation)

## Installation

### Client

```bash
# Navigate to the project directory
cd employee-status-app

# Install dependencies
npm install
```

### Server

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install
```

## Running the Application

### Development Mode

To run both the client and server concurrently:

```bash
# From the project root directory
npm run dev
```

### Running Client and Server Separately

To run the client:

```bash
# From the project root directory
npm start
```

To run the server:

```bash
# From the project root directory
npm run server
```

Or from the server directory:

```bash
# From the server directory
npm start
```

## API Endpoints

- `GET /users` - Get all employees
- `POST /users/:userId` - Update an employee's status

Example POST request:
```
POST http://localhost:3001/users/1
Content-Type: application/json

{
  "status": "Working"
}
```

## Project Structure

```
react-employee-status-app/
├── public/
│   └── index.html
├── server/
│   ├── server.js
│   └── package.json
├── src/
│   ├── components/
│   │   ├── AddEmployeeModal
│   │   │  └──  index.tsx
│   │   ├── Dropdown
│   │   │  └──  index.tsx
│   │   ├── EmployeeList
│   │   │  └──  index.tsx...
│   ├── helpers/
│   │   └── constants.ts
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   └── global.d.ts
├── package.json
└── tsconfig.json
```

## TypeScript Setup

This project uses TypeScript for the client-side code only.

The root `tsconfig.json` file configures TypeScript for the React application.

### Type Definitions

Common types are defined in `src/global.d.ts` and include:

- `UserStatus`: Union type for valid employee statuses
- `User`: Interface for user objects
