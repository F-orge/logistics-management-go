import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedures, router } from "../.";

export const authRouter = router(
  {
    login: publicProcedures
      .input(z.object({ email: z.string().email(), password: z.string() }))
      .mutation(async (opts) => {
        const { db } = opts.ctx;

        const { email, password } = opts.input;

        const dbUser = db
          .selectFrom("auth.users")
          .selectAll()
          .where("email", "=", email)
          .where("password", "=", password)
          .executeTakeFirst();

        if (!dbUser) {
          throw new TRPCError({
            message: "Invalid email or password",
            code: "BAD_REQUEST",
            cause: "Authentication",
          });
        }

        return "login";
      }),
  },
);
