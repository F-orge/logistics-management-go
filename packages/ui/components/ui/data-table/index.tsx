import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type PaginationState,
  type Row,
  type RowData,
  type SortingState,
  type Updater,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import { DataTablePagination } from "./pagination";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../context-menu";
import type React from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sortingState?: SortingState;
  onSortingChange?: (
    updater: Updater<SortingState>
  ) => Promise<unknown> | unknown;
  paginationState?: PaginationState;
  onPaginationChange?: (
    updater: Updater<PaginationState>
  ) => Promise<unknown> | unknown;
  contextMenus?: {
    label: React.ReactNode;
    variant?: "default" | "destructive";
    onClick: (row: Row<TData>) => Promise<unknown> | unknown;
  }[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onSortingChange,
  onPaginationChange,
  paginationState,
  sortingState,
  contextMenus,
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
      sorting: sortingState || [{ id: "createdAt", desc: true }],
    },
  });

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
                <ContextMenu key={row.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </ContextMenuTrigger>
                  {contextMenus && (
                    <ContextMenuContent>
                      {contextMenus.map((item) => (
                        <ContextMenuItem
                          key={item.label?.toString()}
                          onClick={() => item.onClick(row)}
                          variant={item.variant}
                        >
                          {item.label}
                        </ContextMenuItem>
                      ))}
                    </ContextMenuContent>
                  )}
                </ContextMenu>
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
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
