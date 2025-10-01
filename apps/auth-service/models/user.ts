import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { entity } from "./utils";
import type { Resolvers } from "../server";

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

export const userResolver = (value: typeof userTable.$inferSelect) => ({
  id: () => value.id,
  name: () => value.name,
  email: () => value.email,
  emailVerified: () => value.emailVerified,
  image: () => value.image,
  role: () => value.role,
  banned: () => value.banned,
  banReason: () => value.banReason,
  banExpires: () => value.banExpires,
} as Resolvers["User"]);
