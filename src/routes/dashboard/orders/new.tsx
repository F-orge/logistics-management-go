import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/orders/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/orders/new"!</div>
}
