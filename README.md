# University Management Platform

A full-stack platform for university management, featuring authentication, dashboards, and user management for students, teachers, directors, and administrators.

---

## Project Structure

```
backend/
  auth-service/         # NestJS microservice for authentication
    src/
      auth/             # Auth logic, controllers, services, DTOs
      utilisateur/      # User entity
    .env                # Environment variables
    package.json        # Backend dependencies
frontend/
  front/                # React frontend
    src/
      components/       # UI components (Login, Dashboard, etc.)
      contexts/         # React context (Auth)
    package.json        # Frontend dependencies
SQL files:              # Database seed scripts
  new_users.sql
  insert.sql
  check_user.sql
```

---

## Quick Start

### 1. Database Setup (PostgreSQL)
- Create the database:
  ```powershell
  & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE DATABASE university_db;"
  ```
- Seed users:
  ```powershell
  $env:PGPASSWORD='postgres'
  & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d university_db -f "c:\Users\rayen\Desktop\university-management-platform\new_users.sql"
  & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d university_db -f "c:\Users\rayen\Desktop\university-management-platform\insert.sql"
  ```

### 2. Backend Setup (NestJS)
- Install dependencies:
  ```powershell
  cd backend/auth-service
  npm install
  ```
- Configure `.env` (edit with your DB and mail settings):
  ```env
  DB_HOST=localhost
  DB_PORT=5432
  DB_USERNAME=postgres
  DB_PASSWORD=postgres
  DB_NAME=university_db
  JWT_SECRET=your-secret-key
  JWT_EXPIRES_IN=1d
  MAIL_HOST=smtp.mailtrap.io
  MAIL_PORT=2525
  MAIL_USER=your-mailtrap-user
  MAIL_PASS=your-mailtrap-password
  PORT=3001
  ```
- Start backend:
  ```powershell
  npm run start:dev
  ```
  - Runs at: http://localhost:3001

### 3. Frontend Setup (React)
- Install dependencies:
  ```powershell
  cd frontend/front
  npm install
  ```
- Start frontend:
  ```powershell
  npm start
  ```
  - Runs at: http://localhost:3000

---

## Test Users

| Role         | Email                    | Password              |
|--------------|--------------------------|-----------------------|
| Admin        | admin@university.com     | NewSecurePassword123! |
| Étudiant     | jean.dupont@example.com  | JeanPass123!          |
| Étudiant     | test@example.com         | (reset via API)       |

To set/reset a password for any user, use the forgot/reset password API:
1. POST `/api/auth/forgot-password` (email)
2. Get token from DB
3. POST `/api/auth/reset-password` (email, token, new password)

---

## API Endpoints (Backend)

- `POST /api/auth/login` — Login
- `POST /api/auth/change-password` — Change password
- `POST /api/auth/forgot-password` — Request password reset
- `POST /api/auth/reset-password` — Reset password with token
- `POST /api/auth/confirm-email` — Confirm email
- `POST /api/auth/resend-confirmation` — Resend confirmation
- `GET /api/auth/me` — Get current user (JWT required)

---

## Frontend Features
- Modern login page (glassmorphism, gradients)
- Dashboards for different roles
- Password reset and email confirmation flows
- Responsive design

---

## Development Notes
- Backend: NestJS, TypeORM, JWT, PostgreSQL, Nodemailer
- Frontend: React, Axios, React Router
- Database: PostgreSQL
- Email: Use Mailtrap or your SMTP provider for development

---

## Troubleshooting
- If login fails for a user, reset their password using the API and DB as described above.
- If email sending fails, tokens are still saved to DB for manual reset.
- For more users, edit and run the SQL seed files.

---

## License
UNLICENSED (for educational/demo use)
