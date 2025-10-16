import * as React from 'react'
import { Outlet, createRootRoute, createRootRouteWithContext } from '@tanstack/react-router'
import type { RouterClient } from '@orpc/server'
import type { orpcClient } from '@/lib/orpc'
import type { QueryClient } from '@tanstack/react-query'
import type { authClient } from '@/lib/auth'

export const Route = createRootRouteWithContext<{
  orpcClient: typeof orpcClient
  queryClient: QueryClient
  authClient: typeof authClient
}>()({
  component: RootComponent,
})

function RootComponent() {
  return <Outlet />
}
