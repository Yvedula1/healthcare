# Requirements

## Project Name

CareTrack Healthcare Portal

## End User

Clinic Admin / Care Coordinator

---

## Functional Requirements

### Patient Management

The admin should be able to:

* Add a patient
* View all patients
* Update patient details
* Delete a patient

### Patient Fields

Each patient should contain:

* id
* firstName
* lastName
* age
* email
* phone
* condition
* appointmentDate
* appointmentStatus

---

## Appointment Status

Allowed values:

* Scheduled
* Completed
* Cancelled

Store appointment status as an Enum.

---

## Dashboard

Display the following summary cards:

### Total Patients

Count of all patients.

### Scheduled Appointments

Count of patients with Scheduled status.

### Completed Visits

Count of patients with Completed status.

### Cancelled Visits

Count of patients with Cancelled status.

---

## REST APIs

### Patient APIs

POST /api/patients

GET /api/patients

GET /api/patients/{id}

PUT /api/patients/{id}

DELETE /api/patients/{id}

### Dashboard API

GET /api/dashboard

Example Response:

{
"totalPatients":25,
"scheduled":10,
"completed":12,
"cancelled":3
}

---

## Validation Requirements

### firstName

* Required

### lastName

* Required

### email

* Required
* Valid email format

### age

* Must be greater than 0

### appointmentStatus

* Must be one of:

  * Scheduled
  * Completed
  * Cancelled

---

## Error Handling

Implement:

* Global Exception Handling
* Validation Error Responses
* Resource Not Found Responses

Use @ControllerAdvice.

---

## UI Requirements

### Design

Use Tailwind CSS.

Healthcare-themed design.

Modern dashboard appearance.

Responsive layout.

### Dashboard

Display:

* Total Patients
* Scheduled Appointments
* Completed Visits
* Cancelled Visits

### Patient Table

Columns:

* Name
* Age
* Condition
* Appointment Date
* Status

Status badges:

* Scheduled → Blue
* Completed → Green
* Cancelled → Red

### Patient Form

Support:

* Create Patient
* Edit Patient

Validation messages should be visible in UI.

---

## Database Requirements

Use Local PostgreSQL.

Do NOT use:

* Flyway
* Liquibase
* Docker Database

Use:

spring.jpa.hibernate.ddl-auto=update

for schema generation.

---

## Acceptance Criteria

✓ Create patient

✓ View patient list

✓ Update patient

✓ Delete patient

✓ Dashboard counts update automatically

✓ Data persists in PostgreSQL

✓ Responsive UI

✓ Clean healthcare-themed design

✓ End-to-end application works locally
