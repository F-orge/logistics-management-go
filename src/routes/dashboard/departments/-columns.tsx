import { Avatar, AvatarImage } from '@marahuyo/react-ui/ui/avatar';
import { Badge } from '@marahuyo/react-ui/ui/badge';
import { Button } from '@marahuyo/react-ui/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@marahuyo/react-ui/ui/dropdown-menu';
import { useNavigate } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Route } from '.';
import type {
  DepartmentsResponse,
  UsersRecord,
} from '../../../../lib/pocketbase.gen';

export type ExpandedDepartmentResponse = DepartmentsResponse<{
  employees?: UsersRecord[];
  managers?: UsersRecord[];
}>;

export const columns: ColumnDef<ExpandedDepartmentResponse>[] = [
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
                    editDepartment: true,
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
                    deleteDepartment: true,
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
    header: 'ID',
    cell: ({ row }) => <Badge variant={'secondary'}>{row.original.id}</Badge>,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <h4 className="hover:underline cursor-pointer">{row.original.name}</h4>
    ),
  },
  {
    id: 'avatar',
    accessorKey: 'avatar',
    header: 'Photo',
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage
          src={`/api/files/departments/${row.original.id}/${row.original.avatar}`}
        />
      </Avatar>
    ),
  },
];
