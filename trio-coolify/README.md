# Trio Collectives — Demo Landing Page (Coolify-ready)

A single-page boutique website for **Trio Collectives** in Kalispell, Montana —
home decor, kitchen, gifts, Swedish candy, and new & used apparel. Built around
their existing Toast POS so online ordering can be wired in later without changing
the website.

Structured as a clean React + FastAPI + MongoDB stack, deployable to **Coolify**
on any VPS via Docker Compose.

---

## What's inside

```
trio-coolify/
├── backend/                # FastAPI service (port 8000, /api/* routes)
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── server.py           # newsletter signup + /api/health
│   └── .dockerignore
├── frontend/               # CRA + Tailwind + shadcn/ui, served by NGINX in prod
│   ├── Dockerfile          # multi-stage: node:20 build -> nginx:alpine serve
│   ├── nginx.conf          # serves build/ and reverse-proxies /api -> backend:8000
│   ├── package.json
│   ├── public/             # includes /preview/* pitch PDF + screenshots
│   ├── src/
│   └── .dockerignore
├── docs/
│   └── COOLIFY_DEPLOY.md
├── docker-compose.yml      # frontend + backend + mongo wired together
├── .env.example
└── .gitignore
```

---

## Local dev (with Docker, exactly like prod)

```bash
cp .env.example .env
docker compose up --build
```

- Frontend: <http://localhost:8080> _(after publishing the port — see below)_
- Mongo: internal only at `mongodb://mongo:27017`

To run locally without a domain, edit `docker-compose.yml` and add to the
`frontend` service:

```yaml
    ports:
      - "8080:80"
```

(then `docker compose up --build`).

---

## Local dev (without Docker)

Split terminals — backend first, then frontend.

```bash
# terminal 1 — backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
MONGO_URL=mongodb://localhost:27017 DB_NAME=trio_dev \
  uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

```bash
# terminal 2 — frontend
cd frontend
yarn install
# Point the dev server at the local backend (CRA proxy)
yarn start
```

For the dev frontend to talk to the local backend you can either:

- Run them on the same origin via the production Docker compose stack (recommended), or
- Add `"proxy": "http://localhost:8000"` to `frontend/package.json` for CRA's dev proxy.

---

## Deploying to Coolify (TL;DR)

1. Push this folder to a GitHub repo (e.g. `trio-collectives`).
2. In Coolify → **New Resource → Application → Public Repository** (or your GitHub source).
3. **Build Pack: Docker Compose**.
4. Set the domain (e.g. `trio.yourdomain.com`).
5. Paste env vars from `.env.example` (Coolify → Environment Variables).
6. Deploy.

Full walkthrough: [`docs/COOLIFY_DEPLOY.md`](docs/COOLIFY_DEPLOY.md)

---

## Pitch assets

Already shipped inside the frontend container at:

- `/preview/trio-collectives-pitch.pdf` — 2-page pitch sheet for the client
- `/preview/trio-collectives-desktop.jpg` — full-page desktop screenshot
- `/preview/trio-collectives-mobile.jpg` — full-page mobile screenshot
- `/preview/trio-collectives-cover.jpg` — above-the-fold image

After deploy, those will be live at `https://trio.yourdomain.com/preview/...`.

---

## Conventions

- **Backend** binds `0.0.0.0:8000`, every route prefixed `/api`.
- **`/api/health`** is the container healthcheck endpoint.
- **MongoDB** uses UUID strings as primary keys, ISO datetime strings as timestamps. `_id` never leaks into responses.
- **Frontend** calls relative `/api/...` URLs only. No `REACT_APP_BACKEND_URL` baked at build time.
- **Secrets** never live in code — always from environment.
