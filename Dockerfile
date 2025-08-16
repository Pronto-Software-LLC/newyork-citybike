# Dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Production image
FROM node:22-alpine AS runner

WORKDIR /app

# Copy only what’s needed for runtime
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Next.js runs on port 3000 by default
EXPOSE 3000

CMD ["npm", "start"]
