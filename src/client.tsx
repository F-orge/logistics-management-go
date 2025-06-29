import { createRouter, RouterProvider } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { routeTree } from './routeTree.gen';
import type { RpcRouter } from './rpc/router';

const router = createRouter({ routeTree });

export const client = createTRPCClient<RpcRouter>({
  links: [
    httpBatchLink({
      url: '/trpc',
    }),
  ],
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw Error('Unable to find `root` element');
}

const root = ReactDOM.createRoot(rootEl);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
