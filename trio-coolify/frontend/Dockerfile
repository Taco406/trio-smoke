# syntax=docker/dockerfile:1.6

# ---------- Stage 1: build ----------
FROM node:20-alpine AS builder
WORKDIR /app

# node:20-alpine ships with yarn 1.x, but install defensively in case the base image changes.
# Disable corepack's interactive download prompt (introduced in Node 20) so the build
# never hangs waiting for stdin.
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN command -v yarn >/dev/null 2>&1 || npm install -g yarn@1.22.22

COPY package.json yarn.lock* package-lock.json* ./

# Use the lockfile when available, otherwise fall back to a fresh install.
RUN if [ -f yarn.lock ]; then \
      yarn install --frozen-lockfile --network-timeout 600000; \
    elif [ -f package-lock.json ]; then \
      npm ci --no-audit --no-fund; \
    else \
      npm install --no-audit --no-fund; \
    fi

# CRA: don't treat warnings as errors and skip sourcemaps to keep the build fast.
ENV CI=false \
    GENERATE_SOURCEMAP=false \
    DISABLE_ESLINT_PLUGIN=true

COPY . .
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
