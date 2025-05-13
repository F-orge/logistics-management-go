import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/tasks/new')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/tasks/new"!</div>;
}
