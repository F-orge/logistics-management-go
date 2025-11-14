# ============================================================================
# Builder Stage 1: Go Backend
# ============================================================================
FROM golang:1.24.2-alpine AS go-builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git make

# Copy Go module files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the entire project
COPY . .

# Build the backend
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o pocketbase .

# ============================================================================
# Builder Stage 2: Frontend (Node)
# ============================================================================
FROM node:latest AS frontend-builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Copy src directory for frontend
COPY src ./src
COPY rsbuild.config.ts tsconfig.json ./
COPY components.json ./

# Install dependencies
RUN pnpm install

# Build frontend
RUN pnpm run build

# ============================================================================
# Runtime Stage: Alpine
# ============================================================================
FROM alpine:3.20

WORKDIR /app

# Copy backend binary from go-builder
COPY --from=go-builder /app/pocketbase ./

# Copy frontend build from frontend-builder
COPY --from=frontend-builder /app/.output ./frontend

# Copy migrations
COPY --chown=app:app migrations ./migrations

# Expose ports
EXPOSE 80

# Start the application
CMD ["./pocketbase", "serve", "--http", "0.0.0.0:80"]


