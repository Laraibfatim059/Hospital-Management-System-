# Hospital Management System - API Documentation

## Overview
This API powers the enterprise Hospital Management System, providing robust operational, clinical, and financial modules.

## Authentication
All protected routes require a Bearer token in the `Authorization` header.
`Authorization: Bearer <token>`

## Base URL
`http://localhost:5000/api`

## Modules

### 1. Authentication (`/api/auth`)
- `POST /register`: Register a new user
- `POST /login`: Login and receive JWT
- `GET /me`: Get current user profile
- `POST /forgotpassword`: Request password reset token
- `PUT /resetpassword/:resettoken`: Reset password

### 2. People Directory
- **Departments** (`/api/departments`): Manage hospital departments.
- **Doctors** (`/api/doctors`): Manage doctor profiles, fees, and specializations.
- **Staff** (`/api/staff`): Manage nurses, receptionists, pharmacists, and lab technicians.

### 3. Patient Management (`/api/patients`)
- `GET /`: List all patients (supports search and pagination)
- `POST /`: Register a new patient
- `GET /:id/appointments`: View patient's timeline of appointments
- `GET /:id/history`: View patient's clinical consultation notes
- `GET /:id/prescriptions`: View patient's medication history
- `GET /:id/lab-reports`: View patient's diagnostic history

### 4. Scheduling Engine (`/api/appointments`)
- `POST /`: Book an appointment (Checks for double-booking conflicts)
- `PUT /:id`: Reschedule or update status (`Confirmed`, `Completed`, `Cancelled`)

### 5. Clinical EMR (`/api/medical-records` & `/api/prescriptions`)
- **Medical Records**: POST clinical notes, vitals, and diagnoses.
- **Prescriptions**: POST medications. Pharmacists can `PUT` to mark as `Dispensed`, which automatically deducts inventory.

### 6. Pharmacy & Laboratory
- **Inventory** (`/api/medicines`): Full inventory CRUD. Features a `GET /alerts` endpoint for low-stock and expiring drugs.
- **Lab Catalog** (`/api/lab-tests`): Manage available diagnostics.
- **Lab Orders** (`/api/lab-reports`): Order tests and enter clinical findings.

### 7. Billing & Capacity
- **Invoices & Payments** (`/api/billing`): Generate itemized bills and process payments to automatically settle invoices.
- **Wards & Beds** (`/api/capacity`): Manage hierarchical capacity (Wards -> Rooms -> Beds).
- **Admissions** (`/api/admissions`): Admit patients (automatically flags Beds as `Occupied`) and discharge them (automatically flags Beds as `Available`).

## Security Features
- **Helmet**: Secures HTTP headers.
- **CORS**: Restricts cross-origin requests to the frontend URL.
- **MongoSanitize**: Prevents NoSQL injection attacks.
- **XSS Clean**: Strips malicious HTML/JS from request bodies.
- **HPP**: Protects against HTTP Parameter Pollution.
- **Rate Limiting**: Globally limits IPs to 100 requests per 10 minutes.
