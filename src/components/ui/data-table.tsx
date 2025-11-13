import { UseNavigateResult, useNavigate } from "@tanstack/react-router";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { ListResult } from "pocketbase";
import React, { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface ContextMenuItem<TData> {
  label: string;
  onSelect?: (
    row: Row<TData>,
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">
  ) => void | Promise<void>;
  icon?: React.ReactNode;
  disabled?: boolean;
  variant?: "default" | "destructive";
  divider?: boolean;
  submenu?: ContextMenuItem<TData>[];
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: ListResult<TData>;
  contextItems?: ContextMenuItem<TData>[];
  onPageChange?: (page: number) => void | Promise<void>;
  onPageSizeChange?: (pageSize: number) => void | Promise<void>;
  navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  contextItems = [],
  onPageChange,
  onPageSizeChange,
  navigate,
}: DataTableProps<TData, TValue>) {
  const [selectedRow, setSelectedRow] = useState<Row<TData> | null>(null);

  const table = useReactTable({
    data: data.items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const renderContextMenuItem = (
    item: ContextMenuItem<TData>,
    row: Row<TData>,
    index: number
  ): React.ReactNode => {
    if (item.submenu && item.submenu.length > 0) {
      return (
        <ContextMenuSub key={`context-item-${index}`}>
          <ContextMenuSubTrigger disabled={item.disabled}>
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {item.submenu.map((subitem, subindex) =>
              renderContextMenuItem(subitem, row, subindex)
            )}
          </ContextMenuSubContent>
        </ContextMenuSub>
      );
    }

    return (
      <React.Fragment key={`context-item-${index}`}>
        <ContextMenuItem
          onClick={async () => {
            setSelectedRow(row);
            if (item.onSelect) {
              await item.onSelect(row, navigate);
            }
          }}
          disabled={item.disabled}
          variant={item.variant}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </ContextMenuItem>
        {item.divider && <ContextMenuSeparator />}
      </React.Fragment>
    );
  };

  const renderContextMenu = (row: Row<TData>) => {
    if (contextItems.length === 0) {
      return null;
    }

    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            className="cursor-context-menu"
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          {contextItems.map((item, index) =>
            renderContextMenuItem(item, row, index)
          )}
        </ContextMenuContent>
      </ContextMenu>
    );
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, data.page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(data.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(
        <PaginationItem key="page-1">
          <PaginationLink
            onClick={async () => {
              if (onPageChange) await onPageChange(1);
            }}
            href="#"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (startPage > 2) {
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink
            onClick={async () => {
              if (onPageChange) await onPageChange(i);
            }}
            href="#"
            isActive={i === data.page}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < data.totalPages) {
      if (endPage < data.totalPages - 1) {
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      pages.push(
        <PaginationItem key={`page-${data.totalPages}`}>
          <PaginationLink
            onClick={async () => {
              if (onPageChange) await onPageChange(data.totalPages);
            }}
            href="#"
          >
            {data.totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div className="space-y-4">
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
              table.getRowModel().rows.map((row) =>
                contextItems.length > 0 ? (
                  renderContextMenu(row)
                ) : (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              )
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

      {data.totalPages > 1 && (
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
          <div className="text-sm text-muted-foreground w-full">
            Page {data.page} of {data.totalPages} ({data.totalItems} total
            items)
          </div>
          <Pagination className="w-full">
            <PaginationContent className="w-full justify-end">
              <PaginationItem>
                <PaginationPrevious
                  onClick={async () => {
                    if (data.page > 1 && onPageChange) {
                      await onPageChange(data.page - 1);
                    }
                  }}
                  href="#"
                  className={
                    data.page <= 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {renderPaginationNumbers()}

              <PaginationItem>
                <PaginationNext
                  onClick={async () => {
                    if (data.page < data.totalPages && onPageChange) {
                      await onPageChange(data.page + 1);
                    }
                  }}
                  href="#"
                  className={
                    data.page >= data.totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
