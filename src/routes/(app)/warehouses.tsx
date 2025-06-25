import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/warehouses')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/warehouses"!</div>
}
