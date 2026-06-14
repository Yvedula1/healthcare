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
