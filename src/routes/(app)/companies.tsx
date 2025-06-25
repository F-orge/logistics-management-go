import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/companies')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/companies"!</div>
}
