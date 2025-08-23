import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/lms/inventories")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/lms/inventories"!</div>;
}
