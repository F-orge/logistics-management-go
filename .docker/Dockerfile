FROM oven/bun:alpine AS bun
FROM alpine:3.20 AS alpine
FROM golang:1.24-alpine3.20 AS golang

ARG PUBLIC_DOMAIN_NAME

FROM golang AS golang-build

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY --exclude=web . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server ./cmd/main.go

FROM bun as bun-build

ENV PUBLIC_DOMAIN_NAME=${PUBLIC_DOMAIN_NAME}

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY . .

RUN bun rsbuild build

FROM alpine AS runtime

WORKDIR /app

COPY --from=bun-build /app/dist ./dist
COPY --from=golang-build /app/server .

EXPOSE 80

ENTRYPOINT [ "/app/server","serve","--http=0.0.0.0:80" ]