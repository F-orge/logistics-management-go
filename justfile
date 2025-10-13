set dotenv-load := true

APP_NAME := `cat package.json | jq -r '.name'`
APP_VERSION := `cat package.json | jq -r '.version'`
ORG_NAME := 'f-orge'

dev-backend:
  bun --bun --hot run src/server.ts --console-depth 5

dev-frontend:
  bun rsbuild dev --open

dev:
  docker compose -f compose.dev.yaml up -d
  bun concurrently 'just dev-backend' 'just dev-frontend' -n 'backend,frontend'

build-frontend:
  bun rsbuild build

build-backend:
  bun build src/server.ts --target node --outfile .output/server.js --production
  cp -r migrations .output/migrations

introspect:
  bun kysely-codegen --out-file src/db/types.ts --camel-case --runtime-enums pascal-case --singularize

build:
  just build-frontend
  just build-backend

check:
  bun biome check --fix

start:
  bun .output/server

auth-generate:
  bunx @better-auth/cli@latest generate --output src/db/schemas/better-auth/schema.ts

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