import { afterAll, beforeAll } from "bun:test";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB } from "../src/db/types";

let testDb: Kysely<DB>;

beforeAll(async () => {
  await Bun.$`sqlx database reset -y`.quiet();

  testDb = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.TEST_DB_URL,
      }),
    }),
    plugins: [new CamelCasePlugin()],
  });

  globalThis.testDb = testDb;
});

afterAll(async () => {
  if (testDb) {
    await testDb.destroy();
  }
});

declare global {
  var testDb: Kysely<DB>;
}
