import { DataTable } from '@marahuyo/react-ui/data-table/data-table';
import { DataTableColumnHeader } from '@marahuyo/react-ui/data-table/data-table-column-header';
import { useDataTable } from '@marahuyo/react-ui/hooks/use-data-table';
import { Badge } from '@marahuyo/react-ui/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@marahuyo/react-ui/ui/card';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { pb } from '../../../../lib/pocketbase';
import type { TasksDepartmentKPIResponse } from '../../../../lib/pocketbase.gen';

export const TasksOverAllKPI = () => {
  const kpi = useQuery({
    queryKey: ['tasksOverallKPI'],
    queryFn: () => pb.collection('tasksOverallKPI').getOne('1'),
  });

  return (
    <>
      <Card className="col-span-4">
        <CardHeader>
          <CardDescription>Total Tasks</CardDescription>
          <CardTitle>{kpi.data?.totalTasks}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardDescription>Completed Tasks</CardDescription>
          <CardTitle>{kpi.data?.completedTasks}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardDescription>Todo Tasks</CardDescription>
          <CardTitle>{kpi.data?.todoTasks}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardDescription>In Progress Tasks</CardDescription>
          <CardTitle>{kpi.data?.in_progressTasks}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardDescription>Blocked Tasks</CardDescription>
          <CardTitle>{kpi.data?.blockedTasks}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardDescription>Overdue Tasks</CardDescription>
          <CardTitle>{kpi.data?.overdueTasks}</CardTitle>
        </CardHeader>
      </Card>
    </>
  );
};

export const TasksPriorityKPI = () => {
  const kpi = useQuery({
    queryKey: ['tasksPriorityKPI'],
    queryFn: () => pb.collection('tasksPriorityKPI').getFullList(),
  });

  return (
    <>
      <h2 className="col-span-full text-2xl border-b pb-1.5">Priority</h2>
      {kpi.data?.map((stats) => (
        <Card className="col-span-3" key={stats.priority}>
          <CardHeader>
            <CardDescription>{stats.priority} Task</CardDescription>
            <CardTitle>{stats.taskCountPerPriority}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </>
  );
};

export const TasksDepartmentKPI = () => {
  const columns = useMemo<ColumnDef<TasksDepartmentKPIResponse>[]>(
    () => [
      {
        accessorKey: 'expand.department.name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Department" />
        ),
        meta: {
          label: 'Department',
          placeholder: 'Search by Department...',
          variant: 'select',
        },
      },
      {
        accessorKey: 'taskCountPerDepartment',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tasks Per Department" />
        ),
        cell: ({ row }) => (
          <Badge variant={'secondary'}>
            {row.getValue('taskCountPerDepartment')}
          </Badge>
        ),
        meta: {
          label: 'Department',
          placeholder: 'Search by Department...',
          variant: 'select',
        },
      },
    ],
    [],
  );

  const kpi = useQuery({
    queryKey: ['TasksDepartmentKPI'],
    queryFn: () =>
      pb.collection('tasksDepartmentKPI').getFullList({ expand: 'department' }),
  });

  const { table } = useDataTable({
    data: kpi.data || [],
    columns: columns,
    pageCount: kpi.data?.length || 0,
  });

  return <DataTable className="col-span-full" table={table} />;
};
