import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/inventory/$inventory_item_id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/inventory/$id/edit"!</div>
}
