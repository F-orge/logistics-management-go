import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/users/$id/edit"!</div>
}
