import { Badge } from '@marahuyo/react-ui/ui/badge';
import { Button } from '@marahuyo/react-ui/ui/button';
import { Checkbox } from '@marahuyo/react-ui/ui/checkbox';
import { Link, useNavigate } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';
import { Route } from '.';
import type {
  DepartmentsRecord,
  OrdersRecord,
  ShipmentsRecord,
  TasksRecord,
  UsersRecord,
} from '../../../../lib/pocketbase.gen';
import type { ExpandedTaskResponse } from '../../../queries/tasks';

export const columns: ColumnDef<ExpandedTaskResponse>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const title: string = row.getValue('');
      const id: string = row.getValue('id');

      const navigate = useNavigate({ from: Route.fullPath });

      return (
        <Button
          onClick={() => navigate({ search: (prev) => ({ ...prev, id: id }) })}
          variant={'link'}
          className="text-foreground"
        >
          {title}
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status: string = row.getValue('status');
      switch (status) {
        case 'cancelled':
          return <Badge variant={'destructive'}>{status}</Badge>;
        case 'blocked':
          return <Badge variant={'destructive'}>{status}</Badge>;
        default:
          return <Badge variant={'secondary'}>{status}</Badge>;
      }
    },
  },
  {
    accessorKey: 'due_date',
    header: 'Due date',
    cell: ({ row }) => {
      const dueDate: string = row.getValue('due_date');
      if (dueDate !== '') {
        return <Badge variant={'secondary'}>{dueDate}</Badge>;
      }
      return <Badge variant={'outline'}>No Deadline</Badge>;
    },
  },
  {
    accessorKey: 'expand',
    header: 'Assigner',
    cell: ({ row }) => {
      const expand: {
        assignees: UsersRecord[];
        assigner: UsersRecord;
        department?: DepartmentsRecord;
        order_ref?: OrdersRecord;
        related_shipment?: ShipmentsRecord;
      } = row.getValue('expand');
      return (
        <Badge asChild variant={'secondary'}>
          <Link
            to="/dashboard/users/$user_id"
            params={{ user_id: expand.assigner.id }}
          >
            <ExternalLink />
            {expand.assigner.name}
          </Link>
        </Badge>
      );
    },
  },
  {
    id: 'priority',
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const priority: string = row.getValue('priority');
      return <Badge variant={'secondary'}>{priority}</Badge>;
    },
  },
];
