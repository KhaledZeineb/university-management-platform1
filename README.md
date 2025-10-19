# University Management Platform

## Description

A comprehensive university management platform built with NestJS (backend) and React (frontend) for managing students, teachers, directors, and administrative staff.

## Features

- **User Authentication**: Secure JWT-based authentication system
- **Role-based Access Control**: Different dashboards for students, teachers, directors, and administrators
- **User Management**: Add and manage users with mandatory password changes on first login
- **Dashboard System**: Role-specific dashboards for different user types

## Tech Stack

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with bcrypt password hashing
- **Language**: TypeScript

### Frontend
- **Framework**: React
- **Routing**: React Router
- **Styling**: CSS
- **Language**: JavaScript

## Project Structure

```
university-management-platform/
├── backend/          # NestJS backend application
└── frontend/         # React frontend application
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iset-tozeur-gestion-universitaire/university-management-platform.git
   cd university-management-platform
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Configure your database connection in the environment files
   npm run start:dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Usage

1. Access the application at `http://localhost:3000`
2. Login with your credentials
3. On first login, you will be required to change your password
4. Access your role-specific dashboard

## User Roles

- **Student**: Access to student dashboard and academic information
- **Teacher**: Access to teaching tools and student management
- **Director**: Administrative access to institutional management
- **Administrator**: Full system administration capabilities

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/iset-tozeur-gestion-universitaire/university-management-platform](https://github.com/iset-tozeur-gestion-universitaire/university-management-platform)