import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/departments/new')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/departments/new"!</div>;
}
