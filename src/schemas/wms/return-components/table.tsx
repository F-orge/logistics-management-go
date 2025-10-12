import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import StringCell from '@/components/table/cells/string';
import DateCell from '@/components/table/cells/date';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { WmsReturnStatusEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateReturn'][number] & {
    client?: ORPCOutputs['crm']['inCompany'][number]; // Assuming client is a company from CRM
    salesOrder?: ORPCOutputs['wms']['inSalesOrder'][number];
  }
>[] = [
  {
    accessorKey: 'returnNumber',
    header: 'Return Number',
    cell: ({ row }) => <StringCell value={row.original.returnNumber} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ row }) => <StringCell value={row.original.reason} />,
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
    id: 'salesOrder',
    header: 'Sales Order',
    cell: ({ row }) =>
      row.original.salesOrder ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/sales-orders"
            search={{
              view: true,
              id: row.original.salesOrder.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.salesOrder.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.salesOrder.orderNumber} />
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
