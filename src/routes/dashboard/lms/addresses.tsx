import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/lms/addresses')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/lms/addresses"!</div>;
}
