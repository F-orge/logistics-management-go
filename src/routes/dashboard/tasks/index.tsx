import { Button } from '@marahuyo/react-ui/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@marahuyo/react-ui/ui/card';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';
import { pb } from '../../../../lib/pocketbase';
import { DataTable } from '../../../components/data-table';
import { useTaskKPI } from '../../../hooks/taskInfo';
import type { ExpandedTaskResponse } from '../../../queries/tasks';
import { TaskRepository } from '../../../queries/tasks';
import { columns } from './-columns';
import NewTask from './-new';
import ViewTask from './-view';

export const Route = createFileRoute('/dashboard/tasks/')({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      page: z.number().optional().default(1),
      limit: z.number().optional().default(25),
      filter: z.string().optional(),
      id: z.string().optional(),
      newTask: z.boolean().optional(),
    }),
  ),
});

function RouteComponent() {
  const { page, limit, filter } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const tasks = useQuery({
    queryKey: ['tasks', page, limit, filter],
    queryFn: () => new TaskRepository(pb).getTasks(page, limit, filter),
  });

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
      <section className="flex flex-row justify-end">
        <Button
          onClick={() => {
            navigate({ search: (prev) => ({ ...prev, newTask: true }) });
          }}
          variant={'secondary'}
        >
          Create new Task
        </Button>
      </section>
      <section>
        <DataTable<ExpandedTaskResponse, unknown>
          columns={columns}
          query={tasks}
          routeMetadataPath={Route.fullPath}
        />
      </section>
      <ViewTask />
      <NewTask />
    </div>
  );
}
