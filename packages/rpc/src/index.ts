import type { InferRouterInputs, InferRouterOutputs } from '@orpc/server'
import type { DB } from '@packages/db/db.types'
import type { Kysely } from 'kysely'
import * as orpcRouter from './handlers/index'

export interface ORPCContext {
  kysely: Kysely<DB>
}

export type ORPCServerInputs = InferRouterInputs<typeof orpcRouter>
export type ORPCServerOutputs = InferRouterInputs<typeof orpcRouter>

// Export the handlers
export * as handlers from './handlers/index'
export { orpcRouter }
