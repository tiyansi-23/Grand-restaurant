# Grand-restaurant

Grand-restaurant is a full‑stack restaurant ordering platform that includes:

- A customer-facing React (Vite) frontend (`frontend/`) to browse menu, add to cart, and place orders.
- An admin React (Vite) panel (`admin/`) to manage food items, orders and uploads.
- A Node.js + Express backend (`backend/`) with MongoDB for data persistence and JWT-based authentication.

## Requirements

- Node.js 14+ and npm or Yarn
- MongoDB (local or hosted Atlas)
- Optional: `ffmpeg` for any audio/image processing used by custom uploads

## Tech stack

- Frontend: React + Vite
- Admin: React + Vite
- Backend: Node.js + Express
- Database: MongoDB (Mongoose models in `backend/models`)
- Auth: JWT
- File uploads: handled by backend (see `backend/uploads`)

## Install (Windows PowerShell)

1. Backend

```powershell
cd backend
npm install
# start backend (check package.json scripts)
npm run dev
# or
npm start
```

2. Frontend (customer)

```powershell
cd frontend
npm install
npm run dev
```

3. Admin panel

```powershell
cd admin
npm install
npm run dev
```

Vite usually serves frontends on `http://localhost:5173` (or the port printed by Vite). The backend typically runs on the port set in `backend/.env` (commonly `5000`).

## Environment variables

Create a `.env` file inside `backend/` with (example names — check `backend/config/db.js` and server code for exact variable names):

```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/grand-restaurant?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_jwt_secret
# Optional if using cloud uploads
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### How to create and use `.env` (step-by-step)

1. In `backend/` create a file named `.env` (do NOT commit this file):

```powershell
cd backend
copy ..\.env.example .env
# or on PowerShell: New-Item -Path . -Name ".env" -ItemType "file"
```

2. Open `backend/.env` in a text editor and fill the variables. Example:

```
MONGODB_URI=mongodb+srv://new_db_user:StrongP@ssw0rd@cluster0.mongodb.net/grand-restaurant?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=very_secret_value_here
# CLOUD upload keys if used
CLOUDINARY_CLOUD_NAME=mycloud
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abcdefg
```

3. Security notes:
- Never commit `.env` to the repository. `.gitignore` already excludes `.env`.
- Rotate any exposed credentials immediately in MongoDB Atlas (change password or delete the compromised user and create a new one).
- For CI/CD, store these secrets in the hosting provider's secret store (GitHub Actions Secrets, Vercel, Heroku config vars, etc.) rather than committing them.

4. Verify locally by starting the backend (from the `backend/` folder):

```powershell
npm run dev
# or
node index.js
```

The server will read `process.env.MONGODB_URI` via `backend/config/db.js` and connect to the database.

