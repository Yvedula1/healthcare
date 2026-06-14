# CareTrack Healthcare Portal

CareTrack is a full-stack healthcare management portal that allows clinic administrators and care coordinators to manage patients and track appointment statuses through a modern dashboard.

## Tech Stack

### Frontend

* React
* Tailwind CSS
* Axios

### Backend

* Java Spring Boot
* Spring Web
* Spring Data JPA
* PostgreSQL Driver

### Database

* PostgreSQL (Local Installation)

---

## Project Goal

Build an end-to-end healthcare management portal with:

* Modern healthcare dashboard
* Patient management
* Appointment tracking
* Dashboard analytics
* PostgreSQL persistence
* REST API architecture
* Responsive UI

The application should look like a small production-ready healthcare portal rather than a basic CRUD application.

---

## Backend Structure

backend/src/main/java/com/yasaswini/caretrack/

├── controller
├── service
├── repository
├── entity
├── dto
├── exception

---

## Frontend Structure

frontend/src/

├── components
│   ├── DashboardCards.jsx
│   ├── PatientForm.jsx
│   ├── PatientTable.jsx
│
├── services
│   └── patientService.js
│
├── pages
│   └── Dashboard.jsx
│
├── App.jsx
├── main.jsx



## Git Commit Convention

feat: add patient CRUD APIs

feat: add dashboard summary API

feat: implement healthcare dashboard UI

fix: handle validation errors

refactor: improve service layer

---

## Expected Deliverables

* Patient CRUD
* Dashboard Analytics
* Validation
* Exception Handling
* Responsive UI
* PostgreSQL Integration
* End-to-End Testing

---

## Getting Started

### Prerequisites

* JDK 17+
* Maven 3.9+
* Node.js 18+ and npm
* PostgreSQL 14+ (local install)

### 1. Database setup

Create the application database (and a separate one for tests):

```sql
CREATE DATABASE caretrack;
CREATE DATABASE caretrack_test;
```

The schema is created automatically by Hibernate (`spring.jpa.hibernate.ddl-auto=update`) — no manual migrations.

### 2. Run the backend

The DB password is read from the `DB_PASSWORD` environment variable (never hardcoded).

```bash
cd backend

# Windows (PowerShell)
$env:DB_PASSWORD="postgres"; mvn spring-boot:run

# macOS / Linux
DB_PASSWORD=postgres mvn spring-boot:run
```

Backend runs at **http://localhost:8080**.

Configurable environment variables (all optional except `DB_PASSWORD`):

| Variable | Default | Purpose |
|----------|---------|---------|
| `DB_PASSWORD` | _(required)_ | PostgreSQL password |
| `DB_URL` | `jdbc:postgresql://localhost:5432/caretrack` | JDBC URL |
| `DB_USERNAME` | `postgres` | DB user |
| `FRONTEND_ORIGIN` | `http://localhost:5173` | Allowed CORS origin |

### 3. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:5173** and talks to the backend at `http://localhost:8080`
(override with a `VITE_API_URL` env var if needed).

---

## REST API Reference

Base URL: `http://localhost:8080`

| Method | Endpoint | Description | Success |
|--------|----------|-------------|---------|
| POST | `/api/patients` | Create a patient | 201 |
| GET | `/api/patients` | List all patients | 200 |
| GET | `/api/patients/{id}` | Get one patient | 200 / 404 |
| PUT | `/api/patients/{id}` | Update a patient | 200 / 404 |
| DELETE | `/api/patients/{id}` | Delete a patient | 204 / 404 |
| GET | `/api/dashboard` | Summary counts | 200 |

Sample create/update body:

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "age": 34,
  "email": "jane@example.com",
  "phone": "555-1010",
  "condition": "Diabetes",
  "appointmentDate": "2026-07-01",
  "appointmentStatus": "Scheduled"
}
```

`appointmentStatus` must be `Scheduled`, `Completed`, or `Cancelled`. `phone`, `condition`,
and `appointmentDate` are optional. Errors return a consistent JSON body
(`400` validation/invalid enum with field-level messages, `409` duplicate email, `404` not found).

---

## Testing

### Backend integration tests

Run against the dedicated `caretrack_test` PostgreSQL database (schema is created and dropped per run):

```bash
cd backend

# Windows (PowerShell)
$env:DB_PASSWORD="postgres"; mvn test

# macOS / Linux
DB_PASSWORD=postgres mvn test
```

Covers context load + DB connectivity, full patient CRUD, validation (400),
invalid status (400), duplicate email (409), not-found (404), and dashboard counts.

### Manual UI / end-to-end check

1. Start PostgreSQL, the backend, and the frontend (steps above).
2. Open http://localhost:5173.
3. Click **Add New Patient**, submit the form — the patient appears in the table and the dashboard counts update.
4. Submit with a blank name / invalid email to see inline validation messages.
5. **Edit** a row, change the status, save — the badge color and counts update.
6. **Delete** a row (with confirmation) — it is removed and counts update.
