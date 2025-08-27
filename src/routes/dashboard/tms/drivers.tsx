import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/tms/drivers')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/tms/drivers"!</div>;
}
