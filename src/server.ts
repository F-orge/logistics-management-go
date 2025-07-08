import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createGlobalContext } from "./rpc/context";
import { rpcRouter } from "./rpc/router";
import { migrator } from "./db/migrator";
import { db } from "./db";

await migrator(db).migrateUp();

console.log("starting server");

Bun.serve({
  hostname: "0.0.0.0",
  port: "8080",
  fetch: (request) =>
    fetchRequestHandler({
      endpoint: "/trpc",
      req: request,
      router: rpcRouter,
      createContext: createGlobalContext(db),
    }),
});
