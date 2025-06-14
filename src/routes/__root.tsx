import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <ThemeProvider>
        <Outlet />
        <Toaster />
      </ThemeProvider>
    </React.Fragment>
  );
}
