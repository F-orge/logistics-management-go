import { createRootRoute, Outlet } from "@tanstack/react-router";
import * as React from "react";
import NotFound from "./-not-found";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
