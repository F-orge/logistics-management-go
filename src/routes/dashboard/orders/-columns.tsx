import { DataTableColumnHeader } from '@marahuyo/react-ui/data-table/data-table-column-header';
import { Badge } from '@marahuyo/react-ui/ui/badge';
import { Button } from '@marahuyo/react-ui/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@marahuyo/react-ui/ui/dropdown-menu';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import { Route } from '.';
import type {
  OrdersResponse,
  UsersRecord,
  WarehousesRecord,
} from '../../../../lib/pocketbase.gen';

export type ExpandedOrdersResponse = OrdersResponse<{
  customer: UsersRecord;
  createdBy: UsersRecord;
  assignedWarehouse: WarehousesRecord;
}>;

export const columns: ColumnDef<ExpandedOrdersResponse>[] = [
  {
    id: 'actions',
    header: () => (
      <Button variant={'ghost'} size={'sm'}>
        Action
      </Button>
    ),
    cell: ({ row }) => {
      const navigate = Route.useNavigate();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
                    id: row.original.id,
                    editOrder: true,
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
                    deleteOrder: true,
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
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Id"
      />
    ),
    cell: ({ row }) => <Badge variant={'outline'}>{row.original.id}</Badge>,
  },
  {
    id: 'orderIdCustom',
    accessorKey: 'orderIdCustom',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Order #ID"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.orderIdCustom}</Badge>
    ),
  },
  {
    id: 'customer',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Customer"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.expand.customer.name}</Badge>
    ),
  },
  {
    id: 'orderDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Order Date"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {format(row.original.orderDate, 'PPP')}
      </Badge>
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
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.status}</Badge>
    ),
  },
  {
    id: 'totalAmount',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Total Amount"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.totalAmount}</Badge>
    ),
  },
  {
    id: 'createdBy',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Created By"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.expand.createdBy.name}</Badge>
    ),
  },
  {
    id: 'shippingAddress',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Shipping Address"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.shippingAddress}</Badge>
    ),
  },
  {
    id: 'billingAddress',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Billing Address"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.billingAddress}</Badge>
    ),
  },
  {
    id: 'assignedWarehouse',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Assigned Warehouse"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {row.original.expand.assignedWarehouse.name}
      </Badge>
    ),
  },
];
