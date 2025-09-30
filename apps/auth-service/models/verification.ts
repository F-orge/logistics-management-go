import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { entity } from "./utils";

export const verificationTable = pgTable("verification", {
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp().notNull(),
  ...entity,
});
