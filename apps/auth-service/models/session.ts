import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { entity } from "./utils";

export const sessionTable = pgTable("session", {
  expiresAt: timestamp().notNull(),
  token: text().notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: uuid().notNull().references(() => userTable.id),
  impersonatedBy: uuid().references(() => userTable.id),
  ...entity,
});
