import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/orders/$id/create-shipment')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/orders/$id/create-shipment"!</div>
}
