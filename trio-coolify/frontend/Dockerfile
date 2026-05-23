# syntax=docker/dockerfile:1.6

FROM node:20-slim AS builder
WORKDIR /app

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN command -v yarn >/dev/null 2>&1 || npm install -g yarn@1.22.22

COPY package.json yarn.lock* package-lock.json* ./

# Workaround for BuildKit "auto" progress mode (Coolify's default) which hides
# successful step output AND truncates failures. We tee everything to a file and
# cat it as the FINAL action of the RUN step — that output is preserved by BuildKit.
RUN node --version >/tmp/env.log 2>&1; \
    yarn --version >>/tmp/env.log 2>&1; \
    df -h / >>/tmp/env.log 2>&1; \
    (free -h || true) >>/tmp/env.log 2>&1; \
    echo "--- BEGIN INSTALL ---" >>/tmp/env.log; \
    set +e; \
    if [ -f yarn.lock ]; then \
      yarn install --network-timeout 600000 --non-interactive --verbose >>/tmp/env.log 2>&1; \
    elif [ -f package-lock.json ]; then \
      npm ci --no-audit --no-fund --loglevel verbose >>/tmp/env.log 2>&1; \
    else \
      npm install --no-audit --no-fund --loglevel verbose >>/tmp/env.log 2>&1; \
    fi; \
    INSTALL_EXIT=$?; \
    echo "--- END INSTALL (exit=$INSTALL_EXIT) ---" >>/tmp/env.log; \
    [ -f yarn-error.log ] && (echo "--- yarn-error.log ---" >>/tmp/env.log; cat yarn-error.log >>/tmp/env.log); \
    # Print the WHOLE log as the very last lines of this RUN step:
    cat /tmp/env.log; \
    exit $INSTALL_EXIT

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
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=15s --timeout=5s --retries=5 \
  CMD curl -fsS http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
