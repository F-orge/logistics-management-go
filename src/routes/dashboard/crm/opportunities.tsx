import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/crm/opportunities')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/crm/opportunities"!</div>
}
