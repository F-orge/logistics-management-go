import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/billing/credit-note/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/billing/credit-note/"!</div>
}
