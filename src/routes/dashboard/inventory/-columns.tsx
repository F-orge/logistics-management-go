import { DataTableColumnHeader } from '@marahuyo/react-ui/data-table/data-table-column-header';
import { Button } from '@marahuyo/react-ui/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@marahuyo/react-ui/ui/dropdown-menu';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Route } from '.';
import type {
  InventoryItemsResponse,
  ProductsRecord,
  WarehousesRecord,
} from '../../../../lib/pocketbase.gen';

export type ExpandedInventoryItemsResponse = InventoryItemsResponse<{
  product: ProductsRecord;
  warehouse: WarehousesRecord;
}>;

export const columns: ColumnDef<ExpandedInventoryItemsResponse>[] = [
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
                    editInventoryItem: true,
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
                    deleteInventoryItem: true,
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
        className="justify-between w-full"
        column={column}
        title="ID"
      />
    ),
  },
  {
    id: 'product',
    accessorFn: (row) => row.expand.product.name,
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-between w-full"
        column={column}
        title="Product"
      />
    ),
  },
  {
    id: 'warehouse',
    accessorFn: (row) => row.expand.warehouse.name,
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-between w-full"
        column={column}
        title="Warehouse"
      />
    ),
  },
  {
    id: 'quantityOnHand',
    accessorKey: 'quantityOnHand',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-between w-full"
        column={column}
        title="Quantity on hand"
      />
    ),
  },
  {
    id: 'lotNumber',
    accessorKey: 'lotNumber',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-between w-full"
        column={column}
        title="Lot Number"
      />
    ),
  },
  {
    id: 'serialNumber',
    accessorKey: 'serialNumber',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-between w-full"
        column={column}
        title="Serial Number"
      />
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-between w-full"
        column={column}
        title="Status"
      />
    ),
  },
  {
    id: 'expiryDate',
    accessorKey: 'expiryDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-between w-full"
        column={column}
        title="Expiry Date"
      />
    ),
  },
  {
    id: 'storageLocationCode',
    accessorKey: 'storageLocationCode',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-between w-full"
        column={column}
        title="Storage Location Code"
      />
    ),
  },
  {
    id: 'lastCountedDate',
    accessorKey: 'lastCountedDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-between w-full"
        column={column}
        title="Last Counted Date"
      />
    ),
  },
];
