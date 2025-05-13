import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/dashboard/warehouses/$warehouse_id/edit',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/warehouses/$id/edit"!</div>;
}
