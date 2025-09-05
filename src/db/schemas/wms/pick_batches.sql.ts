// Drizzle ORM schema for wms_pick_batches
import { timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { wmsSchema } from './index';

export const pickBatches = wmsSchema.table('pick_batches', {
  id: uuid('id').primaryKey().defaultRandom(),
  strategy: varchar('strategy', { length: 32 }).notNull(), // e.g., batch, wave
  status: varchar('status', { length: 32 }).notNull(), // pending, in_progress, completed
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
