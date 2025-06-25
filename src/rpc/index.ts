import { initTRPC } from "@trpc/server";

const trpc = initTRPC.create();

export const router = trpc.router;

export const publicProcedures = trpc.procedure;

export const authenticatedProcedures = trpc.procedure;

