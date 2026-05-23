# Deploying Trio Collectives on Coolify

End-to-end checklist for getting this app running on your Coolify VPS.

---

## 0. Prereqs

- A working Coolify install on your VPS (any recent version).
- A domain or subdomain pointing to that VPS (A record → server IP).
- This repo pushed to GitHub (public or private — Coolify supports both).

---

## 1. Create the application in Coolify

1. **Projects** → pick a project (or create one, e.g. `JB Web Studios`).
2. **+ New Resource** → **Application**.
3. Source:
   - **Public Repository** → paste the GitHub URL, or
   - **Private (via GitHub App)** → select your trio-collectives repo.
4. **Branch**: `main`
5. **Build Pack**: **Docker Compose**
6. **Base Directory**: `/` (the compose file lives at repo root)
7. **Docker Compose Location**: `docker-compose.yml`
8. Save.

---

## 2. Domain + SSL

1. In the application's **General / Domains** panel, set:
   ```
   https://trio.yourdomain.com
   ```
2. Coolify will automatically:
   - Route the public domain to the `frontend` service (port 80) via Traefik.
   - Issue a Let's Encrypt cert on first deploy.
3. No Traefik labels needed in `docker-compose.yml` — Coolify handles them.

---

## 3. Environment variables

In **Environment Variables**, paste:

```
MONGO_URL=mongodb://mongo:27017
DB_NAME=trio_prod
CORS_ORIGINS=https://trio.yourdomain.com
```

> Replace `trio.yourdomain.com` with the domain you set in step 2.
> If you skip `CORS_ORIGINS`, it falls back to `*` (fine for the demo, not great long-term).

You do NOT need to set anything for the frontend — it talks to the backend
internally through NGINX (`/api/* -> backend:8000`).

---

## 4. Deploy

Click **Deploy**. First build will take ~3–5 minutes (Node + Python images cold).

What Coolify does:
1. Clones the repo
2. Runs `docker compose build` (builds `backend`, `frontend` images)
3. Starts `mongo` first (waits for the healthcheck)
4. Starts `backend` (waits for `/api/health`)
5. Starts `frontend` (NGINX)
6. Traefik routes your public domain → `frontend:80`

---

## 5. Verify

- `https://trio.yourdomain.com` → the landing page loads with SSL.
- `https://trio.yourdomain.com/api/health` → `{"status":"ok","db":true}`
- `https://trio.yourdomain.com/preview/trio-collectives-pitch.pdf` → the 2-page pitch PDF.
- Submit the newsletter form on the landing page → toast confirms success.
- `https://trio.yourdomain.com/api/newsletter` → JSON list including your test email.

---

## 6. Updates

Push to `main`. Coolify will auto-detect and rebuild
(or you can disable auto-deploy and trigger manually).

---

## Common gotchas

- **`502 Bad Gateway` right after deploy** — the backend takes ~15s to be healthy.
  Wait 30s, refresh. If it persists, check the backend container logs in Coolify.
- **`/api/*` returns the React index.html** — NGINX `location /api/` block is missing
  or the `backend` service name in `nginx.conf` doesn't match `docker-compose.yml`.
- **Mongo data lost on redeploy** — make sure the named volume `mongo_data` is
  present in `docker-compose.yml` (it is by default). Coolify preserves named volumes
  across deploys.
- **Build fails with CRA "treat warnings as errors"** — the frontend Dockerfile
  already sets `CI=false`. If you forked it and removed that, restore it.
- **CORS errors in browser console** — set `CORS_ORIGINS` to your exact public
  domain (with `https://`).

---

## Locking it down (optional, after first deploy)

- Set `CORS_ORIGINS` to your exact domain (no wildcard).
- Add HTTP basic auth to the frontend service via Coolify (UI toggle) if the
  client wants the demo private until launch.
- Add a daily MongoDB backup via Coolify's Backups tab pointing at the
  `mongo_data` volume.
