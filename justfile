set dotenv-load := true

APP_NAME := `cat package.json | jq -r '.name'`
APP_VERSION := `cat package.json | jq -r '.version'`
ORG_NAME := 'f-orge'

dev:
  bun vite dev

build:
  bun vite build

check:
  bun biome check --fix

start:
  bun .output/server

auth-generate:
  bunx @better-auth/cli@latest generate --output src/db/schemas/better-auth.ts

drizzle-generate:
  bunx drizzle-kit generate

drizzle-migrate:
  bunx drizzle-kit migrate

drizzle-studio:
  bunx drizzle-kit studio

docker-build:
  @if docker manifest inspect ${DOCKER_REGISTRY_URL}/{{ORG_NAME}}/{{APP_NAME}}:{{APP_VERSION}} > /dev/null 2>&1; then \
    echo "Error: Image ${DOCKER_REGISTRY_URL}/{{ORG_NAME}}/{{APP_NAME}}:{{APP_VERSION}} already exists" 1>&2; \
    exit 1; \
  fi
  @docker build -t ${DOCKER_REGISTRY_URL}/{{ORG_NAME}}/{{APP_NAME}}:{{APP_VERSION}} -t ${DOCKER_REGISTRY_URL}/{{ORG_NAME}}/{{APP_NAME}}:latest .

docker-push: docker-build
  @docker push ${DOCKER_REGISTRY_URL}/{{ORG_NAME}}/{{APP_NAME}}:{{APP_VERSION}}
  @docker push ${DOCKER_REGISTRY_URL}/{{ORG_NAME}}/{{APP_NAME}}:latest
  @curl ${DEPLOYMENT_WEBHOOK_URL}