import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/access-control/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/access-control/"!</div>;
}
