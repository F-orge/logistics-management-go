import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { RolePermissionResponseModel } from '@/lib/bindings/RolePermissionResponseModel';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ExternalLink, MoreHorizontal } from 'lucide-react';
import { Route } from './route';

export const columns: ColumnDef<RolePermissionResponseModel>[] = [
  {
    header: 'Action',
    cell: ({ row }) => {
      const navigate = Route.useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={'icon'} variant={'ghost'}>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  search: (prev) => ({
                    ...prev,
                    id: row.original.id,
                    view: true,
                  }),
                })
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  search: (prev) => ({
                    ...prev,
                    id: row.original.id,
                    edit: true,
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
                    delete: true,
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
