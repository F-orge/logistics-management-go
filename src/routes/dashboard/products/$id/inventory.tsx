import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/products/$id/inventory')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/products/$id/inventory"!</div>
}
