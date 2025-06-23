
migrate-latest:
	sqlx migrate run

dev-tailwind:
	tailwindcss -i ./web/globals.css -o ./dist/out.css -w

dev-templ:
	templ generate -watch

dev-bun:
	bun build --target=browser --outdir=dist/js ./web/js/* --watch

dev-go:
	air serve

dev:
	make -j dev-tailwind dev-templ dev-go dev-bun

build:
	bun build --splitting --target=browser --outdir=dist/js ./web/js/* --minify
	templ generate
	tailwindcss -i ./web/globals.css -o ./dist/out.css --minify
	go build -o ./.out/main .