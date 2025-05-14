import { createFileRoute, Outlet } from '@tanstack/react-router';
import { DataTable } from '../../../components/data-table';
import { useTaskKPI, useTasks } from '../../../hooks/taskInfo';
import { columns } from './-columns';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@marahuyo/react-ui/ui/card';

export const Route = createFileRoute('/dashboard/tasks/')({
  component: RouteComponent,
});

function RouteComponent() {
  const tasks = useTasks();
  const stats = useTaskKPI();
  return (
    <div className="flex flex-col gap-2.5 no-scrollbar overflow-y-auto">
      <section className="grid grid-cols-3 gap-2.5">
        <Card>
          <CardHeader>
            <CardDescription>Total Tasks</CardDescription>
            <CardTitle className="text-4xl">
              {stats.data?.total_tasks}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Completed Tasks</CardDescription>
            <CardTitle className="text-4xl">
              {stats.data?.completed_tasks}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Todo / (Backlogs) Tasks</CardDescription>
            <CardTitle className="text-4xl">{stats.data?.todo_tasks}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>In Progress Tasks</CardDescription>
            <CardTitle className="text-4xl">
              {stats.data?.in_progress_tasks}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Blocked Tasks</CardDescription>
            <CardTitle className="text-4xl">
              {stats.data?.blocked_tasks}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Overdue Tasks</CardDescription>
            <CardTitle className="text-4xl">
              {stats.data?.overdue_tasks}
            </CardTitle>
          </CardHeader>
        </Card>
      </section>
      <section>
        <DataTable columns={columns} query={tasks} />
      </section>
    </div>
  );
}
