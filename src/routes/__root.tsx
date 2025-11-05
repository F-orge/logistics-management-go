import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TypedPocketBase } from "@/lib/pb.types";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  pocketbase: TypedPocketBase;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return <Outlet />;
}
