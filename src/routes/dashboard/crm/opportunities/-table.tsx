import { getRouteApi } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableColumnHeader } from '@/components/ui/kibo-ui/table';
import type {
  CrmCompaniesRecord,
  CrmContactsRecord,
  CrmOpportunitiesResponse,
} from '@/pocketbase/types';

export const columns: ColumnDef<
  CrmOpportunitiesResponse<{
    company: CrmCompaniesRecord;
    primary_contact: CrmContactsRecord;
  }>
>[] = [
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => {
      const route = getRouteApi('/dashboard/crm/opportunities/');

      const navigate = route.useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={'ghost'}>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      editOpportunity: true,
                      id: row.original.id,
                    }),
                  })
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      deleteOpportunity: true,
                      id: row.original.id,
                    }),
                  })
                }
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Opportunity Name" />
    ),
  },
  {
    accessorKey: 'stage',
    header: ({ column }) => <TableColumnHeader column={column} title="Stage" />,
    cell: ({ row }) => {
      const stage = row.getValue('stage') as string;
      const stageColors = {
        prospecting: 'bg-blue-100 text-blue-800',
        qualification: 'bg-yellow-100 text-yellow-800',
        proposal: 'bg-orange-100 text-orange-800',
        'closed-won': 'bg-green-100 text-green-800',
        'closed-lost': 'bg-red-100 text-red-800',
      };
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
            stageColors[stage as keyof typeof stageColors] ||
            'bg-gray-100 text-gray-800'
          }`}
        >
          {stage.replace('-', ' ')}
        </span>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number;
      return <div>${amount.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: 'probability',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Probability" />
    ),
    cell: ({ row }) => {
      const probability = row.getValue('probability') as number;
      if (!probability) return <div>-</div>;
      return <div>{probability}%</div>;
    },
  },
  {
    accessorKey: 'company',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => {
      const company = row.original.expand?.company;
      if (!company) return <div>-</div>;
      return <div>{company.name}</div>;
    },
  },
  {
    accessorKey: 'primary_contact',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Primary Contact" />
    ),
    cell: ({ row }) => {
      const contact = row.original.expand?.primary_contact;
      if (!contact) return <div>-</div>;
      return (
        <div>
          {contact.first_name} {contact.last_name}
        </div>
      );
    },
  },
  {
    accessorKey: 'close_date',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Close Date" />
    ),
    cell: ({ row }) => {
      const closeDate = row.getValue('close_date');
      if (!closeDate) return <div>-</div>;
      const date = new Date(closeDate as string);
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
];
