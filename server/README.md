# Backend Server (Node.js + Express + MongoDB)

This folder contains the complete backend code for THINK Acquisition.
Copy this entire `server/` directory outside the frontend project and run it independently.

## Setup

```bash
cd server
npm install
cp .env.example .env   # Fill in your values
npm run dev
```

## Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)
- Nodemailer (contact form emails)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/admin/login | Admin login (JWT) |
| GET | /api/content | Get all content sections |
| PUT | /api/content/:id | Update content section |
| GET | /api/submissions | Get contact submissions |
| POST | /api/contact | Submit contact form |
| DELETE | /api/submissions/:id | Delete submission |
| POST | /api/upload | Upload image/file |
| GET | /api/services | Get services |
| POST | /api/services | Add service |
| PUT | /api/services/:id | Update service |
| DELETE | /api/services/:id | Delete service |
