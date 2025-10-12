import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import StringCell from '@/components/table/cells/string';
import DateCell from '@/components/table/cells/date';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { WmsSalesOrderStatusEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateSalesOrder'][number] & {
    client?: ORPCOutputs['crm']['inCompany'][number]; // Assuming client is a company from CRM
    crmOpportunity?: ORPCOutputs['crm']['inOpportunity'][number];
  }
>[] = [
  {
    accessorKey: 'orderNumber',
    header: 'Order Number',
    cell: ({ row }) => <StringCell value={row.original.orderNumber} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'shippingAddress',
    header: 'Shipping Address',
    cell: ({ row }) => <StringCell value={row.original.shippingAddress} />,
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
    id: 'crmOpportunity',
    header: 'CRM Opportunity',
    cell: ({ row }) =>
      row.original.crmOpportunity ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/crm/opportunities"
            search={{
              view: true,
              id: row.original.crmOpportunity.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.crmOpportunity.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.crmOpportunity.name} />
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
