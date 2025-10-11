import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/billing/account-transaction/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/dashboard/billing/account-transaction/"!</div>
}
