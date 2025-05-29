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
  CompaniesRecord,
  DepartmentsRecord,
  OrdersRecord,
  OrdersResponse,
  ShipmentsResponse,
  UsersRecord,
  WarehousesRecord,
} from '../../../../lib/pocketbase.gen';

export type ExpandedShipmentsResponse = ShipmentsResponse<{
  orderRef: OrdersRecord;
  carrier: CompaniesRecord;
  driver: UsersRecord;
  departmentAssigned: DepartmentsRecord;
}>;

export const columns: ColumnDef<ExpandedShipmentsResponse>[] = [
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
                    editShipment: true,
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
                    deleteShipment: true,
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
    id: 'orderRef',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Order ID"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {row.original.expand.orderRef.orderIdCustom}
      </Badge>
    ),
  },
  {
    id: 'trackingNumber',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Tracking Number"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.trackingNumber}</Badge>
    ),
  },
  {
    id: 'carrier',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Carrier"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.expand.carrier.name}</Badge>
    ),
  },
  {
    id: 'status',
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
    id: 'estimatedDeliveryDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Estimated Delivery Date"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {format(row.original.estimatedDeliveryDate, 'PPP')}
      </Badge>
    ),
  },
  {
    id: 'actualDeliveryDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Estimated Delivery Date"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {row.original.actualDeliveryDate
          ? format(row.original.actualDeliveryDate, 'PPP')
          : 'Not yet delivered'}
      </Badge>
    ),
  },
  {
    id: 'driver',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Driver"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.expand.driver.name}</Badge>
    ),
  },
  {
    id: 'departmentAssigned',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Assgined Department"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {row.original.expand.departmentAssigned.name}
      </Badge>
    ),
  },
];
