# CareerPath AI Frontend

Next.js frontend for CareerPath AI.

The frontend uses Next.js `/api` route handlers as a small backend-for-frontend layer. Pages call `/api/roadmaps`, and those route handlers call the Express backend.

## Setup

Create `frontend/.env.local`:

```env
BACKEND_URL=http://localhost:5001
```

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## API Flow

```txt
page.tsx / route page
  -> /api/roadmaps
  -> Express backend at BACKEND_URL
```

## Important Files

- `src/app/page.tsx`: home page and roadmap list
- `src/app/roadmaps/[id]/page.tsx`: single roadmap page
- `src/app/api/roadmaps/*`: Next.js API proxy routes
- `src/app/components/*`: reusable UI components
- `src/types/roadmap.ts`: roadmap TypeScript types

## Notes

- Do not put MongoDB or Gemini secrets in the frontend.
- The Express backend must be running before roadmap API requests will work.
