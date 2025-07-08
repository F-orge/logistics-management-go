import { afterAll, beforeAll } from "bun:test";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB } from "../src/db/types";
import { createTRPCProxyClient, httpBatchLink, TRPCClient } from "@trpc/client";
import { RpcRouter } from "../src/rpc/router";
import { spawn } from "bun";

let testDb: Kysely<DB>;
let trpcClient: TRPCClient<RpcRouter>;
let child: Bun.Subprocess;

beforeAll(async () => {
  //await Bun.$`sqlx database reset -y`.quiet();
  child = spawn({ cmd: ["bun", "run", "src/server.ts", "&"] });

  testDb = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.TEST_DB_URL,
      }),
    }),
    plugins: [new CamelCasePlugin()],
  });

  trpcClient = createTRPCProxyClient<RpcRouter>({
    links: [
      httpBatchLink({
        url: "http://0.0.0.0:8080/trpc",
      }),
    ],
  });

  globalThis.testDb = testDb;
  globalThis.trpcClient = trpcClient;
});

afterAll(async () => {
  if (testDb) {
    await testDb.destroy();
  }
  child.kill();
});

declare global {
  var testDb: Kysely<DB>;
  var trpcClient: TRPCClient<RpcRouter>;
}
