import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/shipments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/shipments"!</div>
}
