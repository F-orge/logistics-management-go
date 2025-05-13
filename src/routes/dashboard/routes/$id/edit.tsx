import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/routes/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/routes/$id/edit"!</div>
}
