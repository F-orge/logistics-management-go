import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/org/roles')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/org/roles"!</div>;
}
