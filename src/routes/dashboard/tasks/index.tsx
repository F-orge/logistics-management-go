import { DataTable } from '@marahuyo/react-ui/data-table/data-table';
import { DataTableAdvancedToolbar } from '@marahuyo/react-ui/data-table/data-table-advanced-toolbar';
import { DataTableColumnHeader } from '@marahuyo/react-ui/data-table/data-table-column-header';
import { DataTableFilterList } from '@marahuyo/react-ui/data-table/data-table-filter-list';
import { DataTableSortList } from '@marahuyo/react-ui/data-table/data-table-sort-list';
import { useDataTable } from '@marahuyo/react-ui/hooks/use-data-table';
import { Badge } from '@marahuyo/react-ui/ui/badge';
import { Button } from '@marahuyo/react-ui/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@marahuyo/react-ui/ui/dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { zodValidator } from '@tanstack/zod-adapter';
import { MoreHorizontal, Text } from 'lucide-react';
import { z } from 'zod';
import {
  Collections,
  type DepartmentsRecord,
  type TasksResponse,
} from '../../../../lib/pocketbase.gen';
import { listRecordsQuery } from '../../../queries';
import DeleteTask from './-delete';
import EditTaskForm from './-edit';
import CreateNewTaskForm from './-new';

const columns: ColumnDef<TasksResponse<{ department: DepartmentsRecord }>>[] = [
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => {
      const navigate = useNavigate({ from: Route.fullPath });
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <MoreHorizontal className="size-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  search: (prev) => ({
                    ...prev,
                    id: row.original.id,
                    editTask: true,
                  }),
                })
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  search: (prev) => ({
                    ...prev,
                    id: row.original.id,
                    deleteTask: true,
                  }),
                })
              }
              variant="destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <Badge variant={'outline'}>{row.getValue('id')}</Badge>,
    meta: {
      label: 'Id',
      placeholder: 'Search by id...',
      variant: 'text',
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: 'title',
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    meta: {
      label: 'Title',
      placeholder: 'Search by Title...',
      variant: 'text',
      icon: Text,
    },
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge className="w-full justify-start" variant={'secondary'}>
        {row.getValue('status')}
      </Badge>
    ),
    meta: {
      label: 'Status',
      placeholder: 'Search by Status...',
      variant: 'select',
      icon: Text,
    },
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <Badge className="w-full justify-start" variant={'secondary'}>
        {row.getValue('description')}
      </Badge>
    ),
    meta: {
      label: 'Descrription',
      placeholder: 'Search by Description...',
      variant: 'text',
      icon: Text,
    },
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'department',
    accessorKey: 'expand.department.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => (
      <Badge className="w-full justify-start" variant={'secondary'}>
        {row.getValue('department')}
      </Badge>
    ),
    meta: {
      label: 'Department',
      placeholder: 'Search by Department...',
      variant: 'select',
      icon: Text,
    },
    enableColumnFilter: true,
    enableSorting: true,
  },
];

export const Route = createFileRoute('/dashboard/tasks/')({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      tasksPage: z.number().default(1),
      tasksPerPage: z.number().default(10),
      filters: z
        .array(
          z.object({
            id: z.string(),
            value: z.string(),
            variant: z.string(),
            operator: z.string(),
          }),
        )
        .optional(),
      joinOperator: z.string().optional(),
      id: z.string().optional(),
      editTask: z.boolean().optional(),
      deleteTask: z.boolean().optional(),
      newTask: z.boolean().optional(),
    }),
  ),
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const tasks = useQuery(
    listRecordsQuery<TasksResponse<{ department: DepartmentsRecord }>>(
      Collections.Tasks,
      { page: searchQuery.tasksPage, perPage: searchQuery.tasksPerPage },
      {
        expand: 'department',
        fields: '*,description:excerpt(20,true)',
      },
    ),
  );

  const { table } = useDataTable({
    //@ts-ignore
    data: tasks.data?.items || [],
    //@ts-ignore
    columns,
    pageCount: tasks.data?.totalPages || 0,
    getRowId: (row) => row.id,
    perPageKey: 'tasksPerPage',
    pageKey: 'tasksPage',
  });

  return (
    <div className="grid grid-cols-12 gap-5">
      <h1 className="text-4xl font-bold col-span-full py-1.5 border-b">
        Tasks
      </h1>
      <DataTable className="col-span-12" table={table}>
        <DataTableAdvancedToolbar table={table}>
          <DataTableFilterList table={table} />
          <DataTableSortList table={table} />
          <Button
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, newTask: true }) })
            }
            size={'sm'}
          >
            Create Task
          </Button>
        </DataTableAdvancedToolbar>
      </DataTable>
      {searchQuery.editTask && <EditTaskForm />}
      {searchQuery.newTask && <CreateNewTaskForm />}
      {searchQuery.deleteTask && <DeleteTask />}
    </div>
  );
}
