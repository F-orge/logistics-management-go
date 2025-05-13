import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/payments/$payment_id/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/payments/$payment_id/"!</div>;
}
