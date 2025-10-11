import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/dms/delivery-route/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/dms/delivery-route/"!</div>
}
