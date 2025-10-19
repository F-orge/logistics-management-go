import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import type { Pool } from "pg";
import z from "zod";
import authSchema from "./schemas/auth";
import billingSchema from "./schemas/billing";
import crmSchema from "./schemas/crm";
import dmsSchema from "./schemas/dms";
import tmsSchema from "./schemas/tms";
import wmsSchema from "./schemas/wms";

export const DbSchema = z.object({
  auth: authSchema,
  billing: billingSchema,
  crm: crmSchema,
  dms: dmsSchema,
  tms: tmsSchema,
  wms: wmsSchema,
});

export const kyselyFactory = (pool: Pool) =>
  new Kysely<any>({
    dialect: new PostgresDialect({ pool }),
    plugins: [new CamelCasePlugin()],
  });
