import { Button } from '@marahuyo/react-ui/ui/button';
import { Input } from '@marahuyo/react-ui/ui/input';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Route } from '.';
import {
  type ExpandedTaskResponse,
  getTasks,
  useMutateUpdateTask,
} from '../../../queries/tasks';

import { Badge } from '@marahuyo/react-ui/ui/badge';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@marahuyo/react-ui/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@marahuyo/react-ui/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@marahuyo/react-ui/ui/tooltip';
import { Link, useNavigate } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, Download, Plus } from 'lucide-react';
import {
  TasksStatusOptions,
  type UsersResponse,
} from '../../../../lib/pocketbase.gen';
import { toast } from 'sonner';
import { ClientResponseError } from 'pocketbase';
import React from 'react';

export const columns: ColumnDef<ExpandedTaskResponse>[] = [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const title = row.getValue('title') as string;
      const description = row.original.description;

      const searchParams = Route.useSearch();

      return (
        <Link
          to="/dashboard/tasks"
          search={{
            ...searchParams,
            id: row.original.id,
            viewTaskDialog: true,
          }}
        >
          <Button variant={'link'} size={'sm'} className="p-0">
            {title}
          </Button>
          <div
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: `${description.slice(0, 64)}...`,
            }}
            className="text-muted-foreground text-xs"
          />
        </Link>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const taskId = row.getValue('id') as string;
      const mutation = useMutateUpdateTask();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge className="cursor-pointer" variant={'secondary'}>
              {status}
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Change status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {Object.keys(TasksStatusOptions).map((option) => (
                <DropdownMenuCheckboxItem
                  onClick={() => {
                    try {
                      mutation.mutate({
                        id: taskId,
                        payload: { status: option as TasksStatusOptions },
                      });
                      toast('Task updated sucessfully');
                    } catch (e) {
                      if (e instanceof ClientResponseError) {
                        toast(e.message);
                      }
                      throw e;
                    }
                  }}
                  checked={option === status}
                  key={option}
                >
                  {option}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: 'assignees.name',
    accessorFn: (row) => row.expand.assignees,
    header: 'Assignees',
    cell: ({ row }) => {
      const navigate = useNavigate({ from: Route.fullPath });

      const assignees: UsersResponse[] | undefined =
        row.getValue('assignees.name');
      const taskId = row.getValue('id') as string;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Badge variant={'outline'}>Show Employees</Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {assignees?.map((user) => (
              <DropdownMenuItem key={user.email}>
                <Link
                  to="/dashboard/users/$user_id"
                  params={{ user_id: user.id }}
                >
                  {user.email}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  search: (prev) => ({
                    ...prev,
                    id: taskId,
                    assignTaskDialog: true,
                  }),
                })
              }
            >
              <Plus />
              Assign employee
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const TaskTable = () => {
  const { page, limit, filter } = Route.useSearch();

  const [filterColumn, setFilterColumn] = React.useState<string>('id');

  const navigate = useNavigate({ from: Route.fullPath });

  const tasks = useQuery(getTasks(page, limit, filter));

  const table = useReactTable({
    columns,
    data: tasks.data?.items || [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: tasks.data?.totalItems,
  });

  if (tasks.isLoading) {
    return 'Loading...';
  }

  return (
    <div className="grid grid-cols-12 items-center gap-2.5">
      <Input
        onChange={(e) =>
          navigate({
            search: (prev) => ({
              ...prev,
              page: 1,
              filter: encodeURIComponent(
                `${filterColumn} ?~ '${e.target.value}'`,
              ),
            }),
          })
        }
        className="col-span-4"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            className="col-span-1 justify-start w-fit"
          >
            Filter: {filterColumn}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((col) => (
              <DropdownMenuCheckboxItem
                key={col.id}
                checked={col.id === filterColumn}
                onClick={() => setFilterColumn(col.id)}
              >
                {col.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="col-start-10 col-span-3 flex flex-row-reverse gap-2.5">
        <Button className="justify-start w-fit">
          <Plus /> Task
        </Button>
        <Button variant={'outline'} className=" justify-start w-fit">
          Columns
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={table.getRowModel().rows.length === 0}
              onClick={() =>
                navigate({
                  search: (prev) => ({ ...prev, page: prev.page + 1 }),
                })
              }
              variant={'outline'}
              size={'icon'}
            >
              <ChevronRight />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Next items</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={page === 1}
              onClick={() =>
                navigate({
                  search: (prev) => ({
                    ...prev,
                    page: Math.max(prev.page - 1, 1),
                  }),
                })
              }
              variant={'outline'}
              size={'icon'}
            >
              <ChevronLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Previous items</TooltipContent>
        </Tooltip>
        <Button variant={'outline'} className="justify-start w-fit">
          <Download /> Download
        </Button>
      </div>
      <div className="rounded-md border col-span-12">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
