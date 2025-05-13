import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/tasks/my-tasks')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/tasks/my-tasks"!</div>;
}
