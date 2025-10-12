import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { BillingTransactionTypeEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateAccountTransaction'][number] & {
    clientAccount?: ORPCOutputs['billing']['inClientAccount'][number];
    processedByUser?: ORPCOutputs['auth']['inUser'][number];
  }
>[] = [
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => <NumberCell value={row.original.amount} />,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <StringCell value={row.original.description} />,
  },
  {
    accessorKey: 'referenceNumber',
    header: 'Reference Number',
    cell: ({ row }) => <StringCell value={row.original.referenceNumber} />,
  },
  {
    accessorKey: 'runningBalance',
    header: 'Running Balance',
    cell: ({ row }) => <NumberCell value={row.original.runningBalance} />,
  },
  {
    accessorKey: 'sourceRecordId',
    header: 'Source Record ID',
    cell: ({ row }) => <StringCell value={row.original.sourceRecordId} />,
  },
  {
    accessorKey: 'sourceRecordType',
    header: 'Source Record Type',
    cell: ({ row }) => <StringCell value={row.original.sourceRecordType} />,
  },
  {
    accessorKey: 'transactionDate',
    header: 'Transaction Date',
    cell: ({ row }) => <DateCell value={row.original.transactionDate} showTime />,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <StringCell value={row.original.type} />,
  },
  {
    id: 'clientAccount',
    header: 'Client Account',
    cell: ({ row }) =>
      row.original.clientAccount ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/billing/client-accounts"
            search={{
              view: true,
              id: row.original.clientAccount.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.clientAccount.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.clientAccount.id} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    id: 'processedByUser',
    header: 'Processed By User',
    cell: ({ row }) =>
      row.original.processedByUser ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/auth/users"
            search={{
              view: true,
              id: row.original.processedByUser.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.processedByUser.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.processedByUser.name} />
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
