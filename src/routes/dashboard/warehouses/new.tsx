import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/warehouses/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/warehouses/new"!</div>
}
