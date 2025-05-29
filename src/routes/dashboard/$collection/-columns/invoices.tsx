import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@marahuyo/react-ui/data-table/data-table-column-header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@marahuyo/react-ui/ui/dropdown-menu';
import { Button } from '@marahuyo/react-ui/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Route } from '..';
import { Badge } from '@marahuyo/react-ui/ui/badge';
import { format } from 'date-fns';
import type {
  InvoicesResponse,
  OrdersRecord,
  UsersRecord,
} from '../../../../../lib/pocketbase.gen';
import type { RecordOptions } from 'pocketbase';

export type ExpandedInvoicesResponse = InvoicesResponse<{
  orderRef?: OrdersRecord;
  customer?: UsersRecord;
}>;

export const columns: ColumnDef<ExpandedInvoicesResponse>[] = [
  {
    id: 'Actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Actions"
      />
    ),
    cell: ({ row }) => {
      const navigate = Route.useNavigate();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={'ghost'} size={'icon'}>
              <MoreHorizontal className="size-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  search: (prev) => ({
                    ...prev,
                    edit: true,
                    id: row.original.id,
                  }),
                })
              }
            >
              Edit
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
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="ID"
      />
    ),
    cell: ({ row }) => <Badge variant={'outline'}>{row.original.id}</Badge>,
  },
  {
    id: 'invoiceNumber',
    accessorKey: 'invoiceNumber',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Invoice Number"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'outline'}>{row.original.invoiceNumber}</Badge>
    ),
  },
  {
    id: 'orderRef',
    accessorKey: 'orderRef',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Order ID"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'outline'}>
        {row.original.expand.orderRef?.orderIdCustom || 'Not Available'}
      </Badge>
    ),
  },
  {
    id: 'customer',
    accessorKey: 'customer',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Customer Name"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'outline'}>
        {row.original.expand.customer?.name || 'Not Available'}
      </Badge>
    ),
  },
  {
    id: 'invoiceDate',
    accessorKey: 'invoiceDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Invoice Date"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'outline'}>
        {row.original.invoiceDate
          ? format(row.original.invoiceDate, 'MM/dd/yyyy hh:mm aa')
          : 'Not Avaiable'}
      </Badge>
    ),
  },
  {
    id: 'dueDate',
    accessorKey: 'dueDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Due Date"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'outline'}>
        {row.original.dueDate
          ? format(row.original.dueDate, 'MM/dd/yyyy hh:mm aa')
          : 'Not Avaiable'}
      </Badge>
    ),
  },
  {
    id: 'totalAmount',
    accessorKey: 'totalAmount',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Total Amount"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'outline'}>{row.original.totalAmount}</Badge>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => <Badge variant={'outline'}>{row.original.status}</Badge>,
  },
];

export const options: RecordOptions = { expand: 'orderRef,customer' };
