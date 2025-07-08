import { initTRPC, TRPCError } from "@trpc/server";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { GlobalContext } from "./context";

export const { createCallerFactory, router, procedure } = initTRPC.context<
  GlobalContext
>().create();

const generalProcedure = procedure;

export const publicProcedures = generalProcedure;

export const authenticatedProcedures = generalProcedure.use((opts) => {
  try {
    const authHeader = opts.ctx.req.headers.get("Authorization");

    if (!authHeader) throw new TRPCError({ code: "FORBIDDEN" });

    const [format, token] = authHeader.split(" ");

    if (format.toLowerCase() !== "bearer") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    const verified = jwt.verify(token, opts.ctx.jwtKey);

    if (typeof verified !== "object" || verified === null) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return opts.next({
      ctx: {
        claims: verified as Required<JwtPayload>,
      },
    });
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    if (e instanceof jwt.NotBeforeError) {
      throw new TRPCError({ code: "BAD_REQUEST" });
    }

    if (e instanceof jwt.TokenExpiredError) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    throw e;
  }
});
