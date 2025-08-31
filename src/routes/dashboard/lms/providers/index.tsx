import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/lms/providers/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/lms/providers/"!</div>;
}
