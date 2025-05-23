import { Dialog, DialogTrigger } from '@marahuyo/react-ui/ui/dialog';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { useAppForm } from '../../../components/form';
import AssignTask from './-assign-task';
import { CreateTaskForm, CreateTaskFormOptions } from './-form';
import { querySchema } from './-schema';
import { TaskTable } from './-table';

export const Route = createFileRoute('/dashboard/tasks/')({
  component: RouteComponent,
  validateSearch: zodValidator(querySchema),
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const createForm = useAppForm({ ...CreateTaskFormOptions });

  return (
    <div>
      <TaskTable />
      <AssignTask />
      <Dialog open={searchQuery.newTaskDialog}>
        <CreateTaskForm form={createForm} />
      </Dialog>
    </div>
  );
}
