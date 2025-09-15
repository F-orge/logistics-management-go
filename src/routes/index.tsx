import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
  },
});

function RouteComponent() {
  return <div>hello world</div>;
}
