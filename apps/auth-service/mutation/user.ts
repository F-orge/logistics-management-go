import { and, eq } from "drizzle-orm";
import { userResolver, userTable } from "../models/user";
import type { Resolvers } from "../server";
import { accountTable } from "../models/account";
import { sessionTable } from "../models/session";

export default {
  signIn: async (_, args, context) => {
    const userResult = await context.db.select().from(userTable).innerJoin(
      accountTable,
      eq(accountTable.userId, userTable.id),
    ).where(
      and(
        eq(userTable.email, args.email),
        eq(accountTable.password, args.password),
      ),
    ).limit(1).execute();

    if (!userResult.length) throw new Error("Invalid email or password");

    // create a new session token
    const newSession = await context.db.insert(sessionTable).values({
      token: crypto.randomUUID(),
      expiresAt: new Date(),
      userId: userResult[0].user.id,
    }).returning().execute();

    if (!newSession.length) throw new Error("Unable to create new session");

    return {
      redirect: false,
      token: newSession[0].token,
      user: userResult[0].user,
    };
  },
} as Resolvers["Mutation"];
