import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/vehicles/new')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/vehicles/new"!</div>;
}
