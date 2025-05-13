import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/dashboard/shipments/$tracking_number/assign-to-route',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/shipments/$id/assign-to-route"!</div>;
}
