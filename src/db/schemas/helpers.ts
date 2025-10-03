import { sql } from 'drizzle-orm';
import { timestamp, uuid } from 'drizzle-orm/pg-core';

export const entityFields = {
  id: uuid()
    .primaryKey()
    .$default(() => sql`gen_random_uuid()`),
  createdAt: timestamp({ withTimezone: true })
    .notNull()
    .$default(() => sql`now()`),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .$default(() => sql`now()`),
  deletedAt: timestamp({ withTimezone: true })
    .notNull()
    .$default(() => sql`now()`),
};

export const omitEntity = {
  id: true as true,
  createdAt: true as true,
  updatedAt: true as true,
  deletedAt: true as true,
};
