import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { AuthClient } from "@/lib/auth";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	authClient: AuthClient;
}>()({
	component: RootComponent,
});

function RootComponent() {
	return <Outlet />;
}
