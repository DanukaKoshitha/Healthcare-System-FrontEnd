# 🖥️ Healthcare Management System – Frontend (Angular)

This is the **frontend application** of the Healthcare Management System built using **Angular**. It connects with the Spring Boot backend and provides an interactive UI for Patients, Doctors, and Admins to manage appointments, users, billing, and more.

## ⚙️ Tech Stack

- **Framework:** Angular 15+
- **HTTP Client:** Angular HttpClientModule
- **Routing:** Angular Router
- **Styling:** Tailwind
- **Auth:** JWT Token-based Authorization
- **Payments:** Stripe Integration

---

## 🌟 Key Features

- 🔐 **JWT Authentication**
  - Secure login and logout flow for all roles
  - Token stored in local/session storage

- 📄 **Role-Based Access**
  - Different UI views for:
    - Admin: manage users, doctors, appointments
    - Doctor: manage patient records
    - Patient: book & manage appointments, make payments

- 📅 **Appointments**
  - View, create, and delete appointments
  - Admins can manage all appointments

- 💳 **Stripe Payment Integration**
  - Pay for medical appointments securely through Stripe

- 📊 **Responsive Dashboards**
  - Role-specific dashboards with summarized data

- 🌐 **REST API Integration**
  - Communicates with backend APIs using Angular services

---
