FROM oven/bun:canary-alpine AS base

# Set working directory
WORKDIR /app

# Copy package and lock files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the codebase
COPY . .

# Build the frontend project
RUN bun rsbuild build && \
  bun build src/server.ts --target node --outfile .output/server.js --production && \
  cp -r migrations .output/migrations

# --- Release image ---
FROM oven/bun:canary-alpine AS runner
WORKDIR /app

# Copy built output and server files
COPY --from=base /app/.output ./.output

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["bun", ".output/server.js"]
