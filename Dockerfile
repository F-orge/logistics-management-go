FROM oven/bun:1 AS base

# Set working directory
WORKDIR /build

# Copy package and lock files
COPY package.json bun.lock ./
COPY packages/db/package.json ./packages/db/
COPY packages/ui/package.json ./packages/ui/
COPY packages/graphql/package.json ./packages/graphql/
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the codebase
COPY . .

# Build the whole project
RUN bun --filter '@packages/*' build && bun --filter '@apps/*' build

# --- Release image ---
FROM oven/bun:canary-alpine AS runner
WORKDIR /app

# Copy built output and server files
COPY --from=base /build/apps/frontend/.output ./.output
COPY --from=base /build/apps/backend/.output/server.js ./.output/server.js

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["bun", ".output/server.js"]
