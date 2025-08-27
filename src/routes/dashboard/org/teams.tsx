import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/org/teams')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/org/teams"!</div>;
}
