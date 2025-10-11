import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/dms/proof-of-delivery/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/dms/proof-of-delivery/"!</div>
}
