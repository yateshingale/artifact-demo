# syntax=docker/dockerfile:1
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/node_modules ./node_modules
COPY src ./src
COPY package*.json ./
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://localhost:4000/health/live || exit 1
CMD ["node", "src/server.js"]
