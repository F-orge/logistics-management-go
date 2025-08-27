import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/org/organization')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/org/organization"!</div>;
}
