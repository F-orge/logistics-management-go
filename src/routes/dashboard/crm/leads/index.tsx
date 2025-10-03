import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/crm/leads/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/crm/leads/"!</div>;
}
