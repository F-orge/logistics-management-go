import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@marahuyo/react-ui/ui/table';

import { Button } from '@marahuyo/react-ui/ui/button';
import { Input } from '@marahuyo/react-ui/ui/input';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@marahuyo/react-ui/ui/dropdown-menu';

import type { useQuery } from '@tanstack/react-query';
import type { ListResult } from 'pocketbase';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  query: ReturnType<typeof useQuery<ListResult<TData>>> & {
    paginateControls: {
      page: number;
      setPage: React.Dispatch<React.SetStateAction<number>>;
    };
    filterControl: {
      filterQuery: string;
      setFilterQuery: React.Dispatch<React.SetStateAction<string>>;
    };
  };
}

export function DataTable<TData, TValue>({
  columns,
  query,
}: DataTableProps<TData, TValue>) {
  const { data, paginateControls, filterControl } = query;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data: data?.items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [filterBy, setFilterBy] = React.useState<string>(
    table
      .getAllColumns()
      .filter((column) => column.getCanHide())
      .at(0)?.id || '',
  );

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="flex gap-2.5 items-center">
          <Input
            placeholder={`Search by ${filterBy || '...'}`}
            onChange={(event) => {
              filterControl.setFilterQuery(
                `${filterBy} ~ ${JSON.stringify(event.target.value.trim())}`,
              );
            }}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Filter By: <code>{filterBy}</code>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {table
                .getAllColumns()
                .filter((column) => column.getIsVisible())
                .map((column) => (
                  <DropdownMenuItem
                    onClick={() => setFilterBy(column.id)}
                    key={column.id}
                  >
                    {column.id}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
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
      <div className="flex items-center justify-end gap-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total found: {data?.totalItems}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            paginateControls.setPage((prev) => Math.max(prev - 1, 1))
          }
          disabled={paginateControls.page === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            paginateControls.setPage((prev) => prev + 1);
          }}
          disabled={data?.items.length === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
