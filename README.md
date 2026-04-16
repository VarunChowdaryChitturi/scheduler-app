# Scheduling Platform (Event & Time Slot Management System)

## Overview

This project is a full-stack scheduling and booking platform inspired by Cal.com. It allows a user to define availability, create event types, and let others book time slots through a public booking page.

The application is built with a focus on clean structure, modular code, and real-world scheduling logic such as slot generation and conflict handling.

---

## Tech Stack

### Frontend

* React.js
* Axios
* React Router

### Backend

* Node.js
* Express.js

### Database

* MySQL

---

## Features

### Event Management

* Create, edit, and delete event types
* Each event has title, description, duration, and unique slug

### Availability

* Set available days (e.g., Monday to Friday)
* Define time range (e.g., 9 AM – 5 PM)
* Set timezone for scheduling

### Booking System

* Public booking page for selecting date and time
* Dynamic slot generation based on availability
* Prevents double booking
* Booking confirmation page with details

### Dashboard (Admin)

* View all bookings
* Cancel bookings

### UI & Navigation

* Separate flows for booking (user) and admin (dashboard & availability)
* Simple navigation using React Router

---

## How It Works

1. Admin sets availability (days and time range)
2. Admin creates event types (e.g., 30 min meeting)
3. User selects an event and date
4. System generates available slots dynamically
5. Already booked slots are filtered out
6. User selects a slot and books it
7. Booking is stored in database and shown in dashboard

---

## Database Design

### event_types

Stores all event configurations like duration and slug.

### availability

Stores weekly availability (day, start time, end time, timezone).

### bookings

Stores all bookings with user details and time slots.

Relationships:

* One event type can have many bookings

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/VarunChowdaryChitturi/scheduler-app.git
cd scheduler-app
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=scheduler_app
```

Start server:

```bash
node server.js
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

### 4. Database Setup

Run these queries in MySQL:

* Create database:

```sql
CREATE DATABASE scheduler_app;
```

* Create tables:
  (Use the schema defined in project files)

---

## Assumptions

* A default admin user is assumed (no authentication implemented)
* All admin features (availability, dashboard) are accessible directly
* Timezone handling is basic and stored as string
* Email notifications are not included in final version

---

## Key Highlights

* Dynamic slot generation based on availability
* Conflict prevention for bookings
* Clean separation of backend routes
* Modular frontend structure using components and routing
* End-to-end working full-stack application

---

## Future Improvements

* Add authentication (admin vs user roles)
* Email notifications for booking confirmation
* Better UI (Tailwind or component library)
* Rescheduling feature
* Timezone conversion support

---

## Conclusion

This project demonstrates a complete scheduling system with real-world logic and full-stack integration. It focuses on clarity, correctness, and practical implementation rather than over-complication.
