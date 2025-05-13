import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/routes/new')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/routes/$id/new"!</div>;
}
