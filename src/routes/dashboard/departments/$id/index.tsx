import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/departments/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/departments/$id/"!</div>
}
