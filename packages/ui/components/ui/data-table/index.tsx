import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type PaginationState,
  type RowData,
  type SortingState,
  type Updater,
  useReactTable,
} from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table'
import { DataTablePagination } from './pagination'
import type { ZodObject } from 'zod'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData?: (dataId: string, columnId: string, value: unknown) => void
    schema?: ZodObject
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  sortingState?: SortingState
  onSortingChange?: (updater: Updater<SortingState>) => Promise<unknown> | unknown
  paginationState?: PaginationState
  onPaginationChange?: (updater: Updater<PaginationState>) => Promise<unknown> | unknown
  updateData?: (dataId: string, columnId: string, value: unknown) => void
  schema?: ZodObject
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onSortingChange,
  onPaginationChange,
  paginationState,
  sortingState,
  schema,
  updateData,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    onSortingChange,
    onPaginationChange,
    state: {
      pagination: paginationState || { pageSize: 10, pageIndex: 1 },
      sorting: sortingState || [{ id: 'createdAt', desc: true }],
    },
    meta: {
      schema,
      updateData,
    },
  })

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
