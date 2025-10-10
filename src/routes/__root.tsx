import * as React from 'react';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import * as orpcRouter from '@/orpc/index';
import { RouterClient } from '@orpc/server';
import { QueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/client-auth';

export const Route = createRootRouteWithContext<{
  orpcClient: RouterClient<typeof orpcRouter>;
  queryClient: QueryClient;
  authClient: typeof authClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
