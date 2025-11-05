import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import "@/styles/globals.css";
import PocketBase from "pocketbase";
import { TypedPocketBase } from "@/lib/pb.types";

// tanstack query integration
const queryClient = new QueryClient();
const pocketbase = new PocketBase() as TypedPocketBase;

const router = createRouter({
  routeTree,
  context: { queryClient, pocketbase },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootEl = document.getElementById("root");

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
    </React.StrictMode>
  );
}
