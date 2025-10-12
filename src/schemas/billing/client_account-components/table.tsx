import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateClientAccount'][number] & {
    client?: ORPCOutputs['crm']['inCompany'][number]; // Assuming client is a company from CRM
  }
>[] = [
  {
    accessorKey: 'availableCredit',
    header: 'Available Credit',
    cell: ({ row }) => <NumberCell value={row.original.availableCredit} />,
  },
  {
    accessorKey: 'creditLimit',
    header: 'Credit Limit',
    cell: ({ row }) => <NumberCell value={row.original.creditLimit} />,
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
    cell: ({ row }) => <StringCell value={row.original.currency} />,
  },
  {
    accessorKey: 'isCreditApproved',
    header: 'Credit Approved',
    cell: ({ row }) => <StringCell value={row.original.isCreditApproved ? 'Yes' : 'No'} />,
  },
  {
    accessorKey: 'lastPaymentDate',
    header: 'Last Payment Date',
    cell: ({ row }) => <DateCell value={row.original.lastPaymentDate} showTime />,
  },
  {
    accessorKey: 'paymentTermsDays',
    header: 'Payment Terms Days',
    cell: ({ row }) => <NumberCell value={row.original.paymentTermsDays} />,
  },
  {
    accessorKey: 'walletBalance',
    header: 'Wallet Balance',
    cell: ({ row }) => <NumberCell value={row.original.walletBalance} />,
  },
  {
    id: 'client',
    header: 'Client',
    cell: ({ row }) =>
      row.original.client ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/crm/companies"
            search={{
              view: true,
              id: row.original.client.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.client.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.client.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => <DateCell value={row.original.createdAt} showTime />,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => <DateCell value={row.original.updatedAt} showTime />,
  },
];
