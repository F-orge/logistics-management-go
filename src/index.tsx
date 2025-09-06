import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { routeTree } from './routeTree.gen';
import './styles/globals.css';
import { createORPCClient, createSafeClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import type {
  InferRouterInputs,
  InferRouterOutputs,
  RouterClient,
} from '@orpc/server';
import type api from './api';
import Orpc from './components/orpc';

// orpc integration
const link = new RPCLink({
  url: `${window.location.origin}/api/orpc`,
});

const orpcClient: RouterClient<typeof api> = createORPCClient(link);
export const orpcSafeClient = createSafeClient(orpcClient);

declare global {
  export type ORPCInputs = InferRouterInputs<typeof api>;
  export type ORPCOutputs = InferRouterOutputs<typeof api>;
}

// tanstack query integration
const queryClient = new QueryClient();

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Orpc.Provider value={orpcClient}>
          <ThemeProvider
            defaultTheme="dark"
            storageKey="pocketbase-template-theme"
          >
            <RouterProvider router={router} />
            <Toaster />
          </ThemeProvider>
        </Orpc.Provider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
