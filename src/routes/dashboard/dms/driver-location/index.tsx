import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/dms/driver-location/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/dms/driver-location/"!</div>
}
