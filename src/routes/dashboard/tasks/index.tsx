import { createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { querySchema } from './-schema'
import { TaskTable } from './-table'

export const Route = createFileRoute('/dashboard/tasks/')({
  component: RouteComponent,
  validateSearch: zodValidator(querySchema)
})

function RouteComponent() {
  return <div>
    <TaskTable />
  </div>
}
