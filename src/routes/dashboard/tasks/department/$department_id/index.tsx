import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/dashboard/tasks/department/$department_id/',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/tasks/department/$id/"!</div>;
}
