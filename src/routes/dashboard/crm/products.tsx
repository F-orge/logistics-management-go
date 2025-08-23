import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/crm/products')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/crm/products"!</div>
}
