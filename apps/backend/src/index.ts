import { createGraphQLYoga } from "@packages/graphql";
import { pubsubFactory } from "@packages/graphql/events";
import sgMail from "@sendgrid/mail";
import { S3Client } from "bun";
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
import { authFactory } from "./auth";

type ServerFactory = {
  pool: Pool;
};

export type HonoVariables = {
  user: ReturnType<typeof authFactory>["$Infer"]["Session"]["user"] | null;
  session:
    | ReturnType<typeof authFactory>["$Infer"]["Session"]["session"]
    | null;
  kysely: Kysely<any>;
  mailer: ReturnType<typeof nodemailer.createTransport> | sgMail.MailService;
};

export const serverFactory = async ({ pool }: ServerFactory) => {
  const router = new Hono<{ Variables: HonoVariables }>();

  // pubsub
  const pubsub = pubsubFactory();

  // minio
  const minio = new S3Client({
    endpoint: process.env.MINIO_ENDPOINT!,
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
    bucket: process.env.MINIO_BUCKET!,
  });

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
    console.error(migrationResult.error);
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
          : "http://localhost:3001",
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

  const yoga = createGraphQLYoga({
    pool,
    jwtSigningKey: process.env.JWT_SIGNING_KEY!,
    jwtIssuer:
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3001"
        : process.env.JWT_ISSUER!,
    jwtAudience: process.env.JWT_AUDIENCE!,
    environment:
      (process.env.NODE_ENV as "development" | "production") || "development",
    enableJWT: true,
  });

  // graphql yoga handler
  router.use("/api/graphql/*", async (ctx) =>
    yoga.fetch(ctx.req.raw, {
      db: kysely,
      minio,
      pubsub,
      mailer: sgMail || localMailer,
    })
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
