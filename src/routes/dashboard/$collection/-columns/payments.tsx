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
import type {
  InvoicesResponse,
  OrdersRecord,
  PaymentsResponse,
  UsersRecord,
} from '../../../../../lib/pocketbase.gen';
import type { RecordOptions } from 'pocketbase';
import { format } from 'date-fns';

export type ExpandedPaymentsResponse = PaymentsResponse<{
  invoice: InvoicesResponse;
}>;

export const columns: ColumnDef<ExpandedPaymentsResponse>[] = [
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
    id: 'paymentDate',
    accessorKey: 'paymentDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Payment Date"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'outline'}>
        {row.original.paymentDate
          ? format(row.original.paymentDate, 'MM/dd/yyyy hh:mm aa')
          : 'Not Available'}
      </Badge>
    ),
  },
  {
    id: 'paymentMethod',
    accessorKey: 'paymentMethod',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Payment Method"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'outline'}>{row.original.paymentMethod}</Badge>
    ),
  },
  {
    id: 'transactionId',
    accessorKey: 'transactionId',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Transaction ID"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'outline'}>{row.original.transactionId}</Badge>
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

export const options: RecordOptions = { expand: 'invoice' };
