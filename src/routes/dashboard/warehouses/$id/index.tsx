import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/warehouses/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/warehouses/$id/"!</div>
}
