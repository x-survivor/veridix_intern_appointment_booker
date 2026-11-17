# Clinio — Appointment Booking System

A modern appointment booking system built with Next.js, designed to simplify appointment management between patients and doctors.

## Overview

Clinio is an appointment management application developed as part of a frontend development internship project. It provides an interface for creating, viewing, filtering, and managing doctor appointments.

The application focuses on a clean, responsive user experience and structured application logic.

## Features

- **Appointment Management**
  - Create new appointments.
  - View appointment records.
  - Update appointment statuses.
  - Cancel or mark appointments as completed.

- **Appointment Filtering**
  - Filter appointments by doctor.
  - Filter by appointment status.
  - Filter by date.

- **Dashboard**
  - View total appointments.
  - Track completed appointments.
  - Track cancelled appointments.

- **Responsive Interface**
  - Desktop appointment table.
  - Responsive appointment cards.
  - Mobile navigation and appointment creation controls.

- **Data Management**
  - MySQL database integration.
  - API routes for appointment operations.
  - Manual data refresh.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework and API routes |
| React 19 | UI development |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| Shadcn UI / Base UI | UI components |
| Redux Toolkit | State management |
| React Hook Form | Form management |
| Zod | Data validation |
| Axios | HTTP requests |
| MySQL2 | Database connectivity |
| date-fns | Date formatting and manipulation |
| Sonner | Toast notifications |
| Lucide React | Icons |

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- pnpm
- MySQL

### 1. Clone the repository

```bash
git clone https://github.com/x-survivor/veridix_intern_appointment_booker.git
```

### 2. Navigate to the project directory

```bash
cd veridix_intern_appointment_booker
```

### 3. Install dependencies

```bash
pnpm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=clinio_appointments
```

Update these values according to your local MySQL configuration.

### 5. Create the database

Run the following SQL command in your MySQL client:

```sql
CREATE DATABASE clinio_appointments;
```

The application expects an `appointments` table with the fields used by the appointment API. Ensure the table is created with the appropriate column types and constraints before running the application.

### 6. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Reference

The application uses Next.js Route Handlers to manage appointment data.

### Appointments

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/appointments` | Retrieve all appointments |
| POST | `/api/appointments` | Create a new appointment |
| GET | `/api/appointments/[id]` | Retrieve an appointment by ID |
| PATCH | `/api/appointments/[id]` | Update an appointment's status |
| GET | `/api/appointments/available-slots` | Retrieve 30 minutes availability slots |

### Create Appointment

**Endpoint:** `POST /api/appointments`

Example request body:

```json
{
  "patient_name": "John Doe",
  "patient_phone": "+923001234567",
  "doctor_name": "Dr. Sara",
  "date": "November 20th, 2026",
  "start_time": "09:00 AM",
  "duration": 30,
  "reason": "General consultation"
}
```

The API validates incoming data using Zod before inserting the appointment into the database.

### Update Appointment Status

**Endpoint:** `PATCH /api/appointments/[id]`

The endpoint is used to update an appointment's status.

Supported statuses:

- `booked`
- `completed`
- `cancelled`

## Appointment Data Structure

Each appointment follows this TypeScript structure:

```ts
export type appointment = {
  id: string;
  doctor_name: string;
  patient_name: string;
  patient_phone: string;
  date: string;
  start_time: string;
  duration: number;
  reason: string | null;
  status: "booked" | "completed" | "cancelled";
  created_at: string;
};
```

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build the application for production |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |

## Project Structure

The project follows a feature-oriented structure:

```text
app/
├── (public)/
│   ├── api/
│   │   └── appointments/
│   └── appointments/
│
features/
├── (public)/
│   └── appointments/
│       ├── components/
│       ├── hooks/
│       └── services/
│
shared/
├── components/
├── constants/
|   ├── types/
|   ├── datasets/  
├── lib/
│   ├── database/
│   └── ReduxStore.ts
```

## Development Notes

The project is actively evolving. Some planned improvements include:

- Centralized appointment state management through Redux Toolkit.
- More comprehensive available-slot calculation.
- Improved API validation and error handling.
- Optimized local state updates after appointment mutations.
- Further responsive UI refinements.

## Author

Developed as part of a frontend development internship project.

**Project:** Clinio — Appointment Booking System
