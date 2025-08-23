import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/crm/companies')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/crm/companies"!</div>
}
