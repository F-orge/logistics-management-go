import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { RolePermissionResponseModel } from '@/lib/bindings/RolePermissionResponseModel';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';

export const columns: ColumnDef<RolePermissionResponseModel>[] = [
  {
    accessorKey: 'name',
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.getValue('name')}</Badge>
    ),
  },
  {
    accessorKey: 'description',
    cell: ({ row }) => (
      <>{row.getValue('description') ?? 'No description...'}</>
    ),
  },
  {
    accessorKey: 'permissions',
    cell: () => (
      <Badge variant={'secondary'}>
        <ExternalLink />
        Show permissions
      </Badge>
    ),
  },
  {
    accessorKey: 'created',
    cell: ({ row }) => (
      <Badge variant={'outline'}>
        {format(row.original.created, 'MM/dd/yyyy hh:mm aa')}
      </Badge>
    ),
  },
  {
    accessorKey: 'updated',
    cell: ({ row }) => (
      <Badge variant={'outline'}>
        {format(row.original.updated, 'MM/dd/yyyy hh:mm aa')}
      </Badge>
    ),
  },
];
