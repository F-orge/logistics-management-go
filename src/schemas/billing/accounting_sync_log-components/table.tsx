import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { ORPCOutputs } from '@/orpc/client';
import { BillingSyncStatusEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateAccountingSyncLog'][number]
>[] = [
  {
    accessorKey: 'externalSystem',
    header: 'External System',
    cell: ({ row }) => <StringCell value={row.original.externalSystem} />,
  },
  {
    accessorKey: 'recordType',
    header: 'Record Type',
    cell: ({ row }) => <StringCell value={row.original.recordType} />,
  },
  {
    accessorKey: 'recordId',
    header: 'Record ID',
    cell: ({ row }) => <StringCell value={row.original.recordId} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'errorMessage',
    header: 'Error Message',
    cell: ({ row }) => <StringCell value={row.original.errorMessage} />,
  },
  {
    accessorKey: 'lastSyncAt',
    header: 'Last Sync At',
    cell: ({ row }) => <DateCell value={row.original.lastSyncAt} showTime />,
  },
  {
    accessorKey: 'nextRetryAt',
    header: 'Next Retry At',
    cell: ({ row }) => <DateCell value={row.original.nextRetryAt} showTime />,
  },
  {
    accessorKey: 'retryCount',
    header: 'Retry Count',
    cell: ({ row }) => <NumberCell value={row.original.retryCount} />,
  },
  {
    accessorKey: 'requestPayload',
    header: 'Request Payload',
    cell: ({ row }) => <StringCell value={row.original.requestPayload} />,
  },
  {
    accessorKey: 'responsePayload',
    header: 'Response Payload',
    cell: ({ row }) => <StringCell value={row.original.responsePayload} />,
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
