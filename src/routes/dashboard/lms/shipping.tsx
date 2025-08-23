import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/lms/shipping')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/lms/shipping"!</div>
}
