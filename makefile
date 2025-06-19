
migrate-latest:
	sqlx migrate run

tailwind-dev:
	tailwindcss -i ./web/globals.css -o ./dist/out.css -w