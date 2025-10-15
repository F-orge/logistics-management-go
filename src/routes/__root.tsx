import type { RouterClient } from '@orpc/server'
import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import * as React from 'react'
import type { authClient } from '@/lib/client-auth'
import type * as orpcRouter from '@/orpc/index'

export const Route = createRootRouteWithContext<{
  orpcClient: RouterClient<typeof orpcRouter>
  queryClient: QueryClient
  authClient: typeof authClient
}>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
