FROM oven/bun:1 AS base

# Set working directory
WORKDIR /app

# Copy package and lock files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the codebase
COPY . .

# Build the project
RUN bun vite build

# --- Release image ---
FROM oven/bun:1 AS runner
WORKDIR /app

# Copy built output and server files
COPY --from=base /app/.output ./.output
COPY --from=base /app/package.json ./
COPY --from=base /app/bun.lock ./
COPY --from=base /app/node_modules ./node_modules

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["bun", ".output/server"]
