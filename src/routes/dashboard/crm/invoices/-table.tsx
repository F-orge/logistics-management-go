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
  CrmInvoicesResponse,
} from '@/pocketbase/types';

export const columns: ColumnDef<
  CrmInvoicesResponse<{ company: CrmCompaniesRecord }>
>[] = [
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => {
      const route = getRouteApi('/dashboard/crm/invoices/');

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
                      editInvoice: true,
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
                      deleteInvoice: true,
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
    accessorKey: 'invoice_number',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Invoice Number" />
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const statusColors = {
        draft: 'bg-gray-100 text-gray-800',
        sent: 'bg-blue-100 text-blue-800',
        paid: 'bg-green-100 text-green-800',
        overdue: 'bg-red-100 text-red-800',
        cancelled: 'bg-gray-100 text-gray-800',
      };
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
            statusColors[status as keyof typeof statusColors] ||
            'bg-gray-100 text-gray-800'
          }`}
        >
          {status}
        </span>
      );
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
    accessorKey: 'invoice_date',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Invoice Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('invoice_date'));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: 'due_date',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('due_date'));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: 'subtotal',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Subtotal" />
    ),
    cell: ({ row }) => {
      const subtotal = row.getValue('subtotal') as number;
      const currency = row.original.currency;
      return (
        <div>
          {currency} {subtotal.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: 'tax_amount',
    header: ({ column }) => <TableColumnHeader column={column} title="Tax" />,
    cell: ({ row }) => {
      const taxAmount = row.getValue('tax_amount') as number;
      const currency = row.original.currency;
      return (
        <div>
          {currency} {taxAmount.toLocaleString()}
        </div>
      );
    },
  },
];
