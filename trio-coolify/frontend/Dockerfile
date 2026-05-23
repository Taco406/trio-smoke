# syntax=docker/dockerfile:1.6

# ---------- Stage 1: build ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps (cache layer)
COPY package.json yarn.lock* package-lock.json* ./
RUN if [ -f yarn.lock ]; then \
      corepack enable && yarn install --frozen-lockfile; \
    else \
      npm install --no-audit --no-fund; \
    fi

# CRA needs CI=false to avoid treating warnings as errors during build
ENV CI=false \
    GENERATE_SOURCEMAP=false \
    DISABLE_ESLINT_PLUGIN=true

COPY . .

# Build with craco (CRA) — emits to ./build
RUN if [ -f yarn.lock ]; then yarn build; else npm run build; fi

# ---------- Stage 2: serve ----------
FROM nginx:alpine AS runner

RUN apk add --no-cache curl

COPY nginx.conf /etc/nginx/conf.d/default.conf
# CRA outputs to build/, not dist/
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=15s --timeout=5s --retries=5 \
  CMD curl -fsS http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
