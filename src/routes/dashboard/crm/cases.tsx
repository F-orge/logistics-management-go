import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/crm/cases')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/crm/cases"!</div>;
}
