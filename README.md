# Payroll Management System

A full-stack payroll management application with role-based access for admins and employees.

## Tech Stack

### Backend

- **Node.js + Express**: Chosen for its simplicity, vast ecosystem, and ease of building REST APIs. Express provides a lightweight framework for handling HTTP requests and middleware.
- **MongoDB**: NoSQL database selected for its flexibility with JSON-like documents, making it suitable for user, salary, and expense data without complex relational schemas.
- **JWT Authentication**: Secure token-based auth for session management and role-based access control.

### Frontend

- **React**: Component-based library for building interactive UIs. Enables reusable components and efficient state management.
- **Vite**: Fast build tool and dev server, chosen for its speed and modern ES modules support over traditional bundlers like Webpack.
- **TailwindCSS**: Utility-first CSS framework for rapid, responsive styling without writing custom CSS.
- **React Router**: For client-side routing and protected routes based on user roles.

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud like MongoDB Atlas)
- npm or pnpm

### Backend Setup

1. Navigate to backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   pnpm install
   ```

3. Create a `.env` file with:

   ```
   PORT=5000
   MONGO_URI=mongodb+srv://your-atlas-connection-string
   JWT_SECRET=your_secret_key
   ```

   **Note:** If you have a `.env.local` file, rename it to `.env` for the backend to load the environment variables.

4. Run the backend:
   ```bash
   npm run dev
   ```
   Server runs on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   pnpm install
   ```

3. Run the frontend:
   ```bash
   npm run dev
   ```
   App runs on http://localhost:5173 (or as shown in terminal)

## Features

- User authentication with JWT
- Role-based access (Admin/Employee)
- Admin: Create and manage salary slips
- Employee: View salary slips and submit expenses
- Responsive UI with TailwindCSS</content>
  <parameter name="filePath">/media/prince/Files/Projects/payroll-submission/README.md
