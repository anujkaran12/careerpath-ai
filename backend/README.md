# CareerPath AI Backend

Express API for CareerPath AI.

The backend connects to MongoDB, calls Gemini to generate roadmap content, and exposes roadmap CRUD endpoints.

## Setup

Create `backend/.env`:

```env
PORT=5001
MONGO_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

The backend runs on:

```txt
http://localhost:5001
```

## Scripts

```bash
npm run dev
npm run build
npm start
```

## Routes

- `GET /`: health check
- `GET /api/roadmaps`: fetch all roadmaps
- `POST /api/roadmaps/generate`: generate and save a roadmap
- `GET /api/roadmaps/:id`: fetch one roadmap
- `DELETE /api/roadmaps/:id`: delete one roadmap

## Important Files

- `src/server.ts`: Express server setup
- `src/routes/roadmap.routes.ts`: roadmap route definitions
- `src/controllers/roadmap.controller.ts`: request handlers
- `src/models/roadmap.model.ts`: Mongoose roadmap model
- `src/services/ai.service.ts`: Gemini roadmap generation
- `src/config/db.ts`: MongoDB connection
- `src/config/ai.ts`: Gemini client setup

## Notes

- Keep `MONGO_URL` and `GEMINI_API_KEY` private.
- The frontend expects this API to run on `http://localhost:5001` during local development.
