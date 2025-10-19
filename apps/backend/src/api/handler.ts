import { DbSchema } from "@packages/db";
import { Hono } from "hono";
import type { HonoVariables } from "..";
import { zValidator } from "@hono/zod-validator";
import z, { ZodObject } from "zod";

const validateSchemaAndTable = (schema: string, table: string) => {
  if (!DbSchema.keyof().safeParse(schema).success) {
    return null;
  }

  const schemaKey = schema as keyof typeof DbSchema.shape;
  const schemaDef = DbSchema.shape[schemaKey];

  if (!schemaDef.keyof().safeParse(table).success) {
    return null;
  }

  return schemaDef.shape[table as keyof typeof schemaDef.shape] as ZodObject;
};

export default new Hono<{ Variables: HonoVariables }>()
  .post(
    ":schema/:table/",
    zValidator("json", z.record(z.string(), z.any())),
    async (ctx) => {
      const schema = ctx.req.param("schema");
      const table = ctx.req.param("table");

      const schemaDef = validateSchemaAndTable(
        ctx.req.param("schema"),
        ctx.req.param("table")
      );

      if (!schemaDef) {
        return ctx.notFound();
      }

      const db = ctx.get("kysely");
      const payload = ctx.req.valid("json");

      const { data, success } = schemaDef.safeParse(payload);

      if (!success)
        return ctx.json({
          code: "BAD_REQUEST",
          message: "Invalid payload data",
        });

      const result = await db
        .withSchema(schema)
        .insertInto(table)
        .values(data)
        .returningAll()
        .executeTakeFirstOrThrow();

      return ctx.json(result);
    }
  )
  .get(
    ":schema/:table/",
    zValidator(
      "query",
      z.object({
        page: z.number().nonnegative().catch(1),
        perPage: z.number().nonnegative().max(100).catch(10),
        sort: z
          .record(z.string(), z.enum(["asc", "desc"]))
          .array()
          .optional(),
        any: z.uuid().array().optional(),
      })
    ),
    async (ctx) => {
      const schema = ctx.req.param("schema");
      const table = ctx.req.param("table");

      const tableDef = validateSchemaAndTable(schema, table);

      if (!tableDef) {
        return ctx.notFound();
      }

      const db = ctx.get("kysely");

      const payload = ctx.req.valid("query");

      let query = db.withSchema(schema).selectFrom(table).selectAll();

      query = query
        .limit(payload.perPage)
        .offset((payload.page - 1) * payload.perPage);

      // sort
      if (payload.sort) {
        for (const sortObj of payload.sort) {
          for (const [column, order] of Object.entries(sortObj)) {
            if (!tableDef.keyof().safeParse(column).success) {
              return ctx.json({
                code: "BAD_REQUEST",
                message: "unknown column for sorting",
              });
            }
            query = query.orderBy(column, order);
          }
        }
      }

      if (payload.any) {
        query = query.where("id", "in", payload.any);
      }

      const result = await query.execute();

      return ctx.json(result);
    }
  )
  .get(":schema/:table/:id", async (ctx) => {
    return ctx.text("hello");
  })
  .patch(":schema/:table/:id", async (ctx) => {
    return ctx.text("hello");
  })
  .delete(":schema/:table/:id", async (ctx) => {
    return ctx.text("hello");
  });
