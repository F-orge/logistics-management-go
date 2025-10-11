import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/dms/task-event/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/dms/task-event/"!</div>
}
