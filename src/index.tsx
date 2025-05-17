import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import '../public/manifest.json'
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { Toaster } from '@marahuyo/react-ui/ui/sonner';
import { ThemeProvider } from '@marahuyo/react-ui/ui/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

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
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
