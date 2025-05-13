import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/orders/$order_id_custom/validate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/orders/$id/validate"!</div>
}
