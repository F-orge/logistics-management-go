set dotenv-load := true

APP_NAME := `cat package.json | jq -r '.name'`
APP_VERSION := `cat package.json | jq -r '.version'`
ORG_NAME := 'f-orge'

lint:
  bun biome check --fix

dev-backend:
  go run . serve

dev-frontend:
  bun rsbuild dev

dev:
  bun concurrently 'just dev-backend' 'just dev-frontend' -n 'backend,frontend'

test:
  AGENT=1 bun test --preload ./packages/graphql/tests/setup.ts

introspect:
  bunx pocketbase-typegen -d pb_data/data.db -o src/lib/pb.types.ts

build:
  bun turbo build && bun biome check --fix

typecheck:
  bun run typecheck

check:
  bun biome check --fix

start:
  bun .output/server

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