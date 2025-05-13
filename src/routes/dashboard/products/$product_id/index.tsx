import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/products/$product_id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/products/$id/"!</div>
}
