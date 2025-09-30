import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { entity } from "./utils";

export const accountTable = pgTable("account", {
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: uuid().notNull().references(() => userTable.id),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: timestamp(),
  refreshTokenExpiresAt: timestamp(),
  scope: text(),
  password: text(),
  ...entity,
});
