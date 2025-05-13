import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import { ThemeProvider } from '@marahuyo/react-ui/ui/theme-provider';

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
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
