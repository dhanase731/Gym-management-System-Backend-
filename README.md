# Backend (Gym Management) — Quick Start

This backend is a simple Node.js + Express + Mongoose app for the Gym Management frontend in this repo.

Prerequisites
- Node.js
- MongoDB (Community Server) running locally (default: mongodb://localhost:27017)

Install & run
```powershell
cd backend
npm install
npm run dev   # nodemon server
```

Create sample data (seed)
```powershell
cd backend
node seed.js
```

Health check
- http://localhost:5000/api/health

Notes
- JWT secret and DB URL are read from `.env` in `backend/`.
- The cron job runs per `CRON_SCHEDULE` in `.env` (default every minute in dev).The cron job simply marks overdue bills and creates a reminder `ActivityLog` entry.
