import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { getTasks, type ExpandedTaskResponse } from "../../../queries/tasks";
import { Route } from ".";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@marahuyo/react-ui/ui/input";
import { Button } from "@marahuyo/react-ui/ui/button";

import { ChevronLeft, ChevronRight, Download, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@marahuyo/react-ui/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@marahuyo/react-ui/ui/tooltip";
import { useNavigate } from "@tanstack/react-router";

export const columns: ColumnDef<ExpandedTaskResponse>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'status', header: 'Status' }
];

export const TaskTable = () => {

  const { page, limit, filter } = Route.useSearch()

  const navigate = useNavigate({ from: Route.fullPath })

  const tasks = useQuery(getTasks(page, limit, filter))

  const table = useReactTable({ columns, data: tasks.data?.items || [], getCoreRowModel: getCoreRowModel(), manualPagination: true, rowCount: tasks.data?.totalItems })

  if (tasks.isLoading) {
    return 'Loading...'
  }

  return (
    <div className="grid grid-cols-12 items-center gap-2.5">
      <Input onChange={(e) => navigate({ search: (prev) => ({ ...prev, page: 1, filter: `title ~ '${e.target.value}'` }) })} className="col-span-4" />
      <Button variant={'outline'} className="col-span-1 justify-start w-fit">
        Filter By
      </Button>
      <div className="col-start-10 col-span-3 flex flex-row-reverse gap-2.5">
        <Button className="justify-start w-fit">
          <Plus /> Task
        </Button>
        <Button variant={'outline'} className=" justify-start w-fit">
          Columns
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button disabled={table.getRowModel().rows.length === 0} onClick={() => navigate({ search: (prev) => ({ ...prev, page: prev.page + 1 }) })} variant={'outline'} size={'icon'}>
              <ChevronRight />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Next items</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button disabled={page === 1} onClick={() => navigate({ search: (prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }) })} variant={'outline'} size={'icon'}>
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
        <Table >
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
  )
}
