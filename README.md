# CareerPath AI

CareerPath AI generates personalized career roadmaps from a target role,
current skills, and experience level.

The project has two apps:

- `frontend`: Next.js app with built-in `/api` route handlers
- `backend`: Express API connected to MongoDB and Gemini

Request flow:

```txt
Frontend page
  -> Next.js /api/roadmaps route
  -> Express backend on http://localhost:5001
  -> MongoDB / Gemini
```

## Prerequisites

- Node.js
- npm
- MongoDB connection string
- Gemini API key

## Backend Setup

Create `backend/.env`:

```env
PORT=5001
MONGO_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Install dependencies and start the backend:

```bash
cd backend
npm install
npm run dev
```

The backend should run on:

```txt
http://localhost:5001
```

## Frontend Setup

Create `frontend/.env.local`:

```env
BACKEND_URL=http://localhost:5001
```

Install dependencies and start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Available Scripts

Backend:

```bash
npm run dev
npm run build
npm start
```

Frontend:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## API Routes

Frontend Next.js routes:

- `GET /api/roadmaps`
- `POST /api/roadmaps/generate`
- `GET /api/roadmaps/:id`
- `DELETE /api/roadmaps/:id`

Backend Express routes:

- `GET /api/roadmaps`
- `POST /api/roadmaps/generate`
- `GET /api/roadmaps/:id`
- `DELETE /api/roadmaps/:id`

## Notes

- Keep MongoDB and Gemini secrets only in `backend/.env`.
- The frontend only needs `BACKEND_URL` so its Next.js API routes can call the backend.
- Start the backend before using the frontend roadmap features.
