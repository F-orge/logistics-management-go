import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/companies/$company_id/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/companies/$id/edit"!</div>;
}
