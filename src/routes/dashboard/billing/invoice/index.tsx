import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/billing/invoice/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/billing/invoice/"!</div>
}
