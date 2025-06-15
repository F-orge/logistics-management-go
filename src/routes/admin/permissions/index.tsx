import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/permissions/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/permissions/"!</div>;
}
