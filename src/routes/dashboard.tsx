import { Outlet, redirect } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';
import { pb } from '../../lib/pocketbase';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: () => {
    if (!pb.authStore.isValid) throw redirect({ to: '/login' });
  },
});

function RouteComponent() {
  return (
    <main>
      <article className="border">
        <Outlet />
      </article>
    </main>
  );
}
