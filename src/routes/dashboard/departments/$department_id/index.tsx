import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/departments/$department_id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/departments/$id/"!</div>
}
