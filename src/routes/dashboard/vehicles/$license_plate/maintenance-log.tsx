import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/vehicles/$license_plate/maintenance-log',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/vehicles/$license_plate/maintenance-log"!</div>
}
