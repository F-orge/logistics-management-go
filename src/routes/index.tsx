import { createFileRoute } from "@tanstack/react-router";
import { orpcSafeClient } from "..";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    const [_, healthCheckMessage] = await orpcSafeClient.health();
    return { healthCheckMessage };
  },
});

function RouteComponent() {
  const { healthCheckMessage } = Route.useLoaderData();

  return (
    <div>
      {healthCheckMessage}
    </div>
  );
}
