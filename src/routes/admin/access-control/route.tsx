import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/access-control')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
