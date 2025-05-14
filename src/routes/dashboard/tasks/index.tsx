import { createFileRoute } from '@tanstack/react-router';
import { DataTable } from '../../../components/data-table';
import { useTasks } from '../../../hooks/taskInfo';
import { columns } from './-columns';

export const Route = createFileRoute('/dashboard/tasks/')({
  component: RouteComponent,
});

function RouteComponent() {
  const tasks = useTasks();
  return (
    <div>
      <DataTable columns={columns} data={tasks.data || []} />
    </div>
  );
}
