set dotenv-load := true

APP_NAME := `cat package.json | jq -r '.name'`
APP_VERSION := `cat package.json | jq -r '.version'`
ORG_NAME := 'f-orge'

# database specific
drizzle-studio:
  @bun drizzle-kit studio --port=3002

auth-generate:
  @bunx @better-auth/cli@latest generate --output src/db/schemas/auth.schema.ts

start-postgres:
  @docker compose -f dev.compose.yaml up -d

check:
  @bun biome check --write

setup:
  @go mod tidy
  @bun install --frozen-lockfile
  @just auth-generate

introspect:
  @bunx pocketbase-typegen --db ./pb_data/data.db -o src/pocketbase/types.ts

dev-backend:
  @bun --hot run src/server.ts

dev-frontend:
  @bun rsbuild dev --open

dev: start-postgres
  @bun concurrently 'just drizzle-studio' 'just dev-backend' 'just dev-frontend' -n 'drizzle-studio,backend,frontend'

docker-build:
  @if docker manifest inspect ${REGISTRY_URL}/{{ORG_NAME}}/{{APP_NAME}}:{{APP_VERSION}} > /dev/null 2>&1; then \
    echo "Error: Image ${REGISTRY_URL}/{{ORG_NAME}}/{{APP_NAME}}:{{APP_VERSION}} already exists" 1>&2; \
    exit 1; \
  fi
  @docker build -t ${REGISTRY_URL}/{{ORG_NAME}}/{{APP_NAME}}:{{APP_VERSION}} -t ${REGISTRY_URL}/{{ORG_NAME}}/{{APP_NAME}}:latest .

docker-push: docker-build
  @docker push ${REGISTRY_URL}/{{ORG_NAME}}/{{APP_NAME}}:{{APP_VERSION}}
  @docker push ${REGISTRY_URL}/{{ORG_NAME}}/{{APP_NAME}}:latest
  @curl ${DEPLOYMENT_WEBHOOK_URL}