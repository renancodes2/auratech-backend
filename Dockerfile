FROM node:20-alpine AS builder
WORKDIR /app

# Install deps (including dev deps needed for build)
COPY package.json package-lock.json* ./
RUN npm install

# Copy sources and build
COPY . .
RUN npm run build

# Remove dev deps to keep final image small
RUN npm prune --production

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built app and production deps
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3333
CMD ["node", "dist/main"]
