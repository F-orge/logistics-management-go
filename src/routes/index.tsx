import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.pocketbase.authStore.isValid) {
      throw redirect({
        to: "/dashboard/$schema/$collection",
        params: { schema: "customer-relations", collection: "leads" },
        search: { perPage: 10 },
      });
    }
  },
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
