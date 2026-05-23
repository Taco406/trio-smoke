# syntax=docker/dockerfile:1.6

# ---------- Stage 1: build ----------
# node:20-slim (Debian-based, glibc) avoids the musl/native-binary compile failures
# that node:20-alpine often hits on React 19 + CRA dep trees.
FROM node:20-slim AS builder
WORKDIR /app

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

# yarn 1.x ships with node:20-slim, but install defensively in case it doesn't.
RUN command -v yarn >/dev/null 2>&1 || npm install -g yarn@1.22.22

COPY package.json yarn.lock* package-lock.json* ./

# NOTE: we deliberately do NOT use --frozen-lockfile here.
# React 19 + react-scripts has known peer-dep tugs-of-war; --frozen-lockfile
# can fail the build on platform-specific lockfile drift. We still respect
# the lockfile (yarn install reads it), we just don't error if a tiny resolve
# differs on the build host.
RUN if [ -f yarn.lock ]; then \
      yarn install --network-timeout 600000; \
    elif [ -f package-lock.json ]; then \
      npm ci --no-audit --no-fund; \
    else \
      npm install --no-audit --no-fund; \
    fi

# CRA: don't treat warnings as errors and skip sourcemaps to keep the build fast.
ENV CI=false \
    GENERATE_SOURCEMAP=false \
    DISABLE_ESLINT_PLUGIN=true \
    NODE_OPTIONS=--max-old-space-size=2048

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
