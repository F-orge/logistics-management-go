import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/dms/delivery-task/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/dms/delivery-task/"!</div>
}
