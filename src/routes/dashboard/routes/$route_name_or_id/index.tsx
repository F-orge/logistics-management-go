import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/routes/$route_name_or_id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/routes/$id/"!</div>
}
