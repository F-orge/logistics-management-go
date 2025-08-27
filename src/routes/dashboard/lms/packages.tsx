import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/lms/packages')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/lms/packages"!</div>;
}
