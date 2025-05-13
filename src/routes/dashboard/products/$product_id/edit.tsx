import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/products/$product_id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/products/$id/edit"!</div>
}
