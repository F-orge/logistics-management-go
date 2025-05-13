import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/shipments/new')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/shipments/new"!</div>;
}
