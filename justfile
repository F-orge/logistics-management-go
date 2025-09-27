set dotenv-load := true

APP_NAME := `cat package.json | jq -r '.name'`
APP_VERSION := `cat package.json | jq -r '.version'`
ORG_NAME := 'f-orge'

# database specific
sea-orm-generate:
  for schema in tms ims wms dms billing; do \
    gen_dir="services/graphql-$schema/src/models"; \
    if [ -f "$gen_dir/mod.rs" ]; then \
      sea-orm-cli generate entity -l --frontend-format -s "$schema" -o "$gen_dir" --with-copy-enums --enum-extra-derives 'async_graphql::Enum,fake::Dummy' --model-extra-derives 'async_graphql::SimpleObject'; \
      rm -f "$gen_dir/lib.rs"; \
    else \
      sea-orm-cli generate entity --frontend-format -s "$schema" -o "$gen_dir" --with-copy-enums --enum-extra-derives 'async_graphql::Enum,fake::Dummy' --model-extra-derives 'async_graphql::SimpleObject'; \
    fi; \
  done

start-postgres:
  @docker compose -f dev.compose.yaml up -d

test:
  @bun test --preload tests/setup.ts

check:
  @bun biome check --write

setup:
  @go mod tidy
  @bun install --frozen-lockfile
  @just auth-generate

introspect:
  @cargo run introspect | tee src/lib/graphql/schema.graphql
  @bun graphql-codegen --config codegen.ts

dev-backend:
  @cargo watch -q -c -x "run serve --database-url $DATABASE_URL --enable-playground"

dev-frontend:
  @bun concurrently 'bun rsbuild dev --open' 'bun graphql-codegen --config codegen.ts --watch' -n 'frontend,codegen'

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