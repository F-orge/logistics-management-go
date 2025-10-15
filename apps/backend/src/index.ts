import { RPCHandler } from '@orpc/server/fetch'
import { BatchHandlerPlugin } from '@orpc/server/plugins'
import { kyselyFactory } from '@packages/db'
import * as orpcRouter from '@packages/rpc'
import { Hono } from 'hono'
import { Pool } from 'pg'
import type { ConfigInterface } from './config'

interface HonoVariables {
  kysely: ReturnType<typeof kyselyFactory>
}

export const serverFactory = (config: ConfigInterface) => {
  const router = new Hono<{ Variables: HonoVariables }>()

  const kysely = kyselyFactory(new Pool({ connectionString: config.databaseUrl }))

  const orpcHandler = new RPCHandler(orpcRouter, {
    plugins: [new BatchHandlerPlugin()],
  })

  return router
}

export default {
  fetch: serverFactory({
    databaseUrl: process.env.DATABASE_URL ?? '',
  }).fetch,
}
