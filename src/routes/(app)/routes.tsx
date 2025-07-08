import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/routes')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(app)/routes"!</div>;
}
