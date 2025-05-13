import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/chat/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/chat/new"!</div>
}
