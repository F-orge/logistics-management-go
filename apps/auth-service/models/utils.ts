import { sql } from "drizzle-orm";
import { timestamp, uuid } from "drizzle-orm/pg-core";

export const entity = {
  id: uuid().primaryKey().notNull().$default(() => sql`gen_random_uuid()`),
  createdAt: timestamp().notNull().$default(() => sql`now()`),
  updatedAt: timestamp().notNull().$default(() => sql`now()`),
  deletedAt: timestamp().notNull().$default(() => sql`now()`),
};
