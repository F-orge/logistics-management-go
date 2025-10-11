import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/billing/client-account/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/billing/client-account/"!</div>
}
