import type { DB } from "@packages/db/db.types";
import type { Kysely } from "kysely";
import type { InferRouterOutputs,InferRouterInputs } from '@orpc/server'
import type * as orpcRouter from "./handlers/index"

export interface ORPCContext {
  kysely:Kysely<DB>
}

export type ORPCServerInputs = InferRouterOutputs<typeof orpcRouter>
export type ORPCServerOutputs = InferRouterInputs<typeof orpcRouter>