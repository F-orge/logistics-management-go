import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/tasks/$task_id/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/tasks/$id/"!</div>;
}
