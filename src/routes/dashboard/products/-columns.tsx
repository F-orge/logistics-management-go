import type { ColumnDef } from '@tanstack/react-table';
import type {
  CompaniesRecord,
  ProductsResponse,
} from '../../../../lib/pocketbase.gen';
import { Badge } from '@marahuyo/react-ui/ui/badge';
import { useNavigate } from '@tanstack/react-router';
import { Route } from '.';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@marahuyo/react-ui/ui/dropdown-menu';
import { Button } from '@marahuyo/react-ui/ui/button';
import { MoreHorizontal } from 'lucide-react';

export type ExpandedProductsResponse = ProductsResponse<{
  supplier: CompaniesRecord;
}>;

export const columns: ColumnDef<ExpandedProductsResponse>[] = [
  {
    id: 'actions',
    header: 'Action',
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
                    editProduct: true,
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
                    deleteProduct: true,
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
    header: 'id',
    cell: ({ row }) => <Badge variant={'secondary'}>{row.original.id}</Badge>,
  },
  {
    id: 'image',
    header: 'image',
    cell: ({ row }) => (
      <img
        className="size-10 rounded-md object-cover"
        src={`/api/files/${row.original.collectionId}/${row.original.id}/${row.original.image[0]}`}
        alt=""
      />
    ),
  },
  {
    id: 'sku',
    accessorKey: 'sku',
    header: 'sku',
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.getValue('sku')}</Badge>
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'name',
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: 'description',
  },
  {
    id: 'weight',
    accessorKey: 'weight',
    header: 'weight',
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {Math.round((row.getValue('weight') as number) * 100) / 100} KG
      </Badge>
    ),
  },
  {
    id: 'dimensionsWidth',
    accessorKey: 'dimensionsWidth',
    header: 'width (cm)',
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.getValue('dimensionsWidth')}</Badge>
    ),
  },
  {
    id: 'dimensionsHeight',
    accessorKey: 'dimensionsHeight',
    header: 'height (cm)',
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.getValue('dimensionsHeight')}</Badge>
    ),
  },
  {
    id: 'dimensionsLength',
    accessorKey: 'dimensionsLength',
    header: 'length (cm)',
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.getValue('dimensionsLength')}</Badge>
    ),
  },
  {
    id: 'cost',
    accessorKey: 'cost',
    header: 'cost',
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.getValue('cost')}</Badge>
    ),
  },
  {
    id: 'supplier',
    accessorFn: (row) => row.expand.supplier.name,
    header: 'supplier',
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.getValue('supplier')}</Badge>
    ),
  },
];
