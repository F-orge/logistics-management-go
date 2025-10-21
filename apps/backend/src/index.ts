import sgMail from "@sendgrid/mail";
import { promises as fs } from "fs";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import {
  CamelCasePlugin,
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
} from "kysely";
import nodemailer from "nodemailer";
import * as path from "path";
import { Pool } from "pg";
import type { ZodError } from "zod";
import { authFactory } from "./auth";
import { BunStorageRepository } from "./storage";
import handler from "./api/handler";
import { createYoga, createSchema } from "graphql-yoga";
import { typeDefs, resolvers } from "@packages/graphql";

type ServerFactory = {
  pool: Pool;
};

export type HonoVariables = {
  user: ReturnType<typeof authFactory>["$Infer"]["Session"]["user"] | null;
  session:
    | ReturnType<typeof authFactory>["$Infer"]["Session"]["session"]
    | null;
  kysely: Kysely<any>;
  storage: BunStorageRepository;
  mailer: ReturnType<typeof nodemailer.createTransport> | sgMail.MailService;
};

export const serverFactory = async ({ pool }: ServerFactory) => {
  const router = new Hono<{ Variables: HonoVariables }>();

  // kysely
  const kysely = new Kysely<any>({
    dialect: new PostgresDialect({ pool }),
    plugins: [new CamelCasePlugin()],
  });

  const migrator = new Migrator({
    db: kysely,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(
        import.meta.dir,
        process.env.NODE_ENV === "production" ? "migrations" : "../migrations"
      ),
    }),
  });

  const migrationResult = await migrator.migrateToLatest();

  if (migrationResult.error) {
    throw migrationResult.error;
  }

  for (const migration of migrationResult.results || []) {
    console.info(
      migration.migrationName,
      migration.direction,
      migration.status
    );
  }

  // middlewares
  router.use(logger());
  router.use(prettyJSON());
  router.use(requestId());

  // mail
  if (process.env.NODE_ENV === "production") {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  const localMailer = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
  });

  // dependency injection
  router.use("*", async (c, next) => {
    c.set("kysely", kysely);
    c.set(
      "storage",
      new BunStorageRepository(process.env.STORAGE_PATH ?? ".data/files")
    );
    c.set("mailer", sgMail || localMailer);
    return next();
  });

  // better auth
  const auth = authFactory(
    pool,
    process.env.NODE_ENV === "production" ? sgMail : localMailer,
    true
  );

  // better auth cors settings
  router.use(
    "/api/auth/*",
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? process.env.DOMAIN_ORIGIN!
          : "http://localhost:3001", // replace with your origin
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })
  );

  router.on(["POST", "GET"], "/api/auth/*", (c) => {
    return auth.handler(c.req.raw);
  });

  const graphqlSchema = createSchema({ typeDefs, resolvers });

  const yoga = createYoga({ schema: graphqlSchema });

  // graphql yoga handler
  router.use("/api/graphql/*", async (ctx) =>
    yoga.fetch(ctx.req.raw, { db: ctx.get("kysely") })
  );

  // frontend mounting
  if (process.env.NODE_ENV === "production") {
    router.get(
      "*",
      serveStatic({
        root: `${import.meta.dir}/frontend`,
        precompressed: true,
      })
    );

    router.get(
      "*",
      serveStatic({
        root: `${import.meta.dir}/frontend`,
        path: "index.html",
        precompressed: true,
      })
    );
  }

  router.use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }
    c.set("user", session.user);
    c.set("session", session.session);
    return next();
  });

  // orpc

  return router;
};

export default {
  fetch: (
    await serverFactory({
      pool: new Pool({ connectionString: process.env.DATABASE_URL }),
    })
  ).fetch,
};
