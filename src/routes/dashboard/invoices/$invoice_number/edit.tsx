import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/dashboard/invoices/$invoice_number/edit',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/invoices/$invoice_number/edit"!</div>;
}
