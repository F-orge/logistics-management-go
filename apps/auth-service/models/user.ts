import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { entity } from "./utils";

export const userTable = pgTable("user", {
  name: text().notNull(),
  email: text().notNull(),
  emailVerified: boolean().notNull().default(false),
  image: text(),
  role: text(),
  banned: boolean().notNull().default(false),
  banReason: text(),
  banExpires: timestamp(),
  ...entity,
});
