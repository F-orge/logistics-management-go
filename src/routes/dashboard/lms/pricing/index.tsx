import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/lms/pricing/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/lms/pricing/"!</div>;
}
