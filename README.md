
# Full-Stack Authentication App

This is a complete web application featuring user authentication (signup and login). It is built with a modern stack including a React frontend and a Node.js/Express backend, all written in TypeScript.

## Technologies Used

- **Frontend:**
  - React
  - Vite
  - TypeScript
  - shadcn/ui
  - Tailwind CSS
- **Backend:**
  - Node.js
  - Express.js
  - TypeScript
  - PostgreSQL
  - JSON Web Tokens (JWT) for authentication
- **Development Tools:**
  - `tsx` for running TypeScript directly
  - `cross-env` for cross-platform environment variable management
  - `eslint` for code linting

## Prerequisites

- Node.js and npm (Node Package Manager)
- Access to a PostgreSQL database instance

## Local Development Setup

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

### 2. Install Dependencies

This will install all the necessary packages for both the frontend and backend.

```bash
npm install
```

### 3. Set Up Environment Variables

Create a file named `.env` in the root of the project. This file will hold your secret keys and database connection string. **This file is ignored by Git and should never be committed.**

Add the following variables to your `.env` file, replacing the placeholder values:

```
# URL for your PostgreSQL database
DATABASE_URL="postgresql://user:password@host:port/database"

# A strong, unique secret for signing JWTs
JWT_SECRET="YOUR_SUPER_SECRET_KEY_HERE"
```

### 4. Database SSL Certificate

This project is configured to connect to the database using SSL. Place your database certificate file, named `ca.pem`, in the root of the project directory. This file is also ignored by Git for security reasons.

### 5. Set Up the Database

Run the following commands to create the necessary tables and, optionally, seed the database with initial data.

```bash
# Create the 'users' table in your database
npm run db:setup

# (Optional) Seed the database with sample data
npm run db:seed
```

### 6. Run the Application

You need to run the frontend and backend servers in two separate terminals.

**Terminal 1: Start the Backend API Server**

```bash
npm run serve:api
```

Your API server will be running and listening for requests on `http://localhost:3000`.

**Terminal 2: Start the Frontend Development Server**

```bash
npm run dev
```

Your React application will be available at `http://localhost:5173`.

## Available NPM Scripts

- `npm run dev`: Starts the Vite development server for the frontend.
- `npm run build`: Builds the frontend application for production.
- `npm run serve:api`: Starts the backend Express server.
- `npm run db:setup`: Creates the required tables in the database.
- `npm run db:seed`: Seeds the database with initial data.
- `npm run lint`: Lints the codebase using ESLint.
