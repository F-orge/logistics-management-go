import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/departments/$department_id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/departments/$id/edit"!</div>
}
