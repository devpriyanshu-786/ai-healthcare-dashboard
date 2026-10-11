# AI Healthcare Dashboard (demo)

A starter full-stack dashboard with a React/Vite frontend and Express/Prisma/SQLite backend. The symptom analysis is **mock/demo logic only**, not medical advice or a real diagnostic system.

## Requirements
- Node.js 20 or newer (LTS recommended)
- npm

## Setup on Windows PowerShell
Open VS Code in this folder, then use a terminal:

1. Install root and app dependencies:
   ```powershell
   npm install
   npm install --prefix backend
   npm install --prefix frontend
   ```
2. Create the backend environment file:
   ```powershell
   Copy-Item backend/.env.example backend/.env
   ```
3. Create the database:
   ```powershell
   cd backend
   npx prisma generate
   npx prisma migrate dev --name init
   cd ..
   ```
4. Start both apps from the project root:
   ```powershell
   npm run dev
   ```
5. Open the frontend URL printed by Vite (usually http://localhost:5173). Backend health check: http://localhost:5000/api/health

Run each command separately in PowerShell; this avoids `&&` separator issues in older PowerShell versions.

## Notes
- This is a learning/demo starter, not production-ready. Add authentication hardening, validation, privacy controls, logging, and deployment configuration before real use.
- Never enter real patient-identifying or sensitive health data into this demo.
