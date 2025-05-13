import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/companies/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/companies/new"!</div>
}
