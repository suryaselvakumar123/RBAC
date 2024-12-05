# RBAC (Role-Based Access Control) System

A modern, responsive Role-Based Access Control system built with React, featuring comprehensive user management, role assignment, and permission control.

## Features

- 👥 User Management
  - Create, edit, and delete users
  - Assign roles and manage user status
  - Search and filter users
  
- 🔑 Role Management
  - Define and modify roles
  - Assign permissions to roles
  - Visualize role-permission relationships
  
- 🛡️ Permission Control
  - Granular permission management
  - Permission matrix visualization
  - Role-based access restrictions

- 🎨 Modern UI/UX
  - Responsive design
  - Interactive data tables
  - Real-time feedback
  - Loading states and animations

## Tech Stack

- React 18
- TailwindCSS
- React Query
- Zustand
- React Router
- HeadlessUI

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   npm start
   ```

## Usage

### Default Credentials
- Email: admin@example.com
- Password: admin

### Available Roles
- Admin: Full access to all features
- Editor: Can read and modify content
- Viewer: Read-only access

## Security Features

- Input validation
- Protected routes
- Role-based authorization
- Secure password handling
- XSS protection

## Best Practices

- Component modularity
- Custom hooks for reusability
- Utility functions
- Consistent error handling
- Responsive design patterns