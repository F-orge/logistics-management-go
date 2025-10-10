import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { routeTree } from './routeTree.gen';
import './styles/globals.css';
import { orpcClient } from '@/orpc/client';
import { authClient } from './lib/client-auth';

// tanstack query integration
const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: { orpcClient, queryClient, authClient },
});

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
        <ThemeProvider
          defaultTheme="dark"
          storageKey="pocketbase-template-theme"
        >
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
