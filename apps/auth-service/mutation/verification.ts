import { and, eq } from "drizzle-orm";
import { userTable } from "../models/user";
import type { Resolvers } from "../server";
import { verificationTable } from "../models/verification";

export default {
  sendEmailVerification: async (_, args, context) => {
    // check if email exists
    const user = await context.db.select().from(userTable).where(
      eq(userTable.email, args.email),
    ).limit(1).execute();

    if (!user.length) throw new Error("Unable to find user");

    if (user[0].emailVerified) throw new Error("Email is already verified");

    // generate a new code with 1 minute expiry

    return {
      success: true,
      message: "Email sent successfully",
      expiresAt: "",
    };
  },
  verifyEmail: async (_, args, context) => {
    // verify email via context
    const user = await context.db.select().from(userTable).where(
      eq(userTable.email, args.email),
    ).limit(1).execute();

    if (!user.length) throw new Error("Unable to find user");

    if (user[0].emailVerified) throw new Error("Email is already verified");

    const verificationToken = await context.db.select().from(verificationTable)
      .where(
        and(
          eq(verificationTable.identifier, args.email),
          eq(verificationTable.value, args.code),
        ),
      ).limit(1).execute();

    if (!verificationToken.length) throw new Error("Invalid code");

    if (verificationToken[0].expiresAt > new Date()) {
      throw new Error("Code expired");
    }

    // update user to be now verified

    const result = await context.db.update(userTable).set({
      emailVerified: true,
    }).where(
      eq(userTable.email, args.email),
    ).execute();

    if (result.rowCount !== 1) throw new Error("Unable to update user");

    return {
      success: true,
      message: "Email verified succesfully",
      redirect: true,
      url: "/dashboard",
    };
  },
} as Resolvers["Mutation"];
