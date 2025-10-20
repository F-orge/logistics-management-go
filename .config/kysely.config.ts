import {
  CamelCasePlugin,
  DummyDriver,
  PostgresAdapter,
  PostgresDialect,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from "kysely";
import { defineConfig } from "kysely-ctl";
import { Pool } from "pg";

export default defineConfig({
  // replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
  dialect: new PostgresDialect({
    pool: new Pool({ connectionString: process.env.DATABASE_URL! }),
  }),
  migrations: {
    migrationFolder: "../apps/backend/migrations",
  },
  plugins: [new CamelCasePlugin()],
  seeds: {
    seedFolder: "../apps/backend/seeds",
  },
});
