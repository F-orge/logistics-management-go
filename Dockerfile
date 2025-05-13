# syntax=docker/dockerfile:1.4

FROM alpine:3.20 AS alpine_base
FROM golang:1.24-alpine3.20 AS golang_base

ARG PUBLIC_DOMAIN_NAME

FROM golang_base AS golang-build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/.output/server ./main.go

FROM node:lts-alpine AS frontend-build

ARG PUBLIC_DOMAIN_NAME
ENV PUBLIC_DOMAIN_NAME=${PUBLIC_DOMAIN_NAME}

WORKDIR /app

RUN apk update && apk add --no-cache git openssh-client

RUN mkdir -p -m 0700 ~/.ssh && \
    ssh-keyscan -t rsa -t ecdsa -t ed25519 github.com >> ~/.ssh/known_hosts

COPY package*.json ./

RUN --mount=type=ssh npm install --verbose

COPY . .

RUN npm run build:frontend

FROM alpine_base AS runtime

WORKDIR /app

COPY --from=frontend-build /app/.output/dist ./dist
COPY --from=golang-build /app/.output/server .

EXPOSE 80

ENTRYPOINT [ "/app/server","serve","--http=0.0.0.0:80" ]