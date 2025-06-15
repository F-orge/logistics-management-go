import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  beforeLoad: () => {
    if (!window.localStorage.getItem('lms-token'))
      throw redirect({ to: '/login' });
  },
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
