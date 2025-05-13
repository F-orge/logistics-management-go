import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/invoices/new')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/invoices/new"!</div>;
}
