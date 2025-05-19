import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import AssignTask from './-assign-task';
import NewTask from './-new';
import { querySchema } from './-schema';
import { TaskTable } from './-table';

export const Route = createFileRoute('/dashboard/tasks/')({
  component: RouteComponent,
  validateSearch: zodValidator(querySchema),
});

function RouteComponent() {
  return (
    <div>
      <TaskTable />
      <AssignTask />
      <NewTask />
    </div>
  );
}
