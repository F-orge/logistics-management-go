import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import NumberCell from '@/components/table/cells/number';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['dms']['paginateDeliveryTask'][number] & {
    deliveryRoute?: ORPCOutputs['dms']['inDeliveryRoute'][number];
    package?: ORPCOutputs['crm']['inProduct'][number];
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'deliveryRoute',
    header: 'Delivery Route',
    cell: ({ row }) =>
      row.original.deliveryRoute ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/dms/delivery-route"
            search={{
              view: true,
              id: row.original.deliveryRoute.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.deliveryRoute.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.deliveryRoute.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'package',
    header: 'Package',
    cell: ({ row }) =>
      row.original.package ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/crm/products"
            search={{
              view: true,
              id: row.original.package.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.package.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.package.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'expectedDeliveryDate',
    header: 'Expected Delivery Date',
    cell: ({ row }) => <DateCell value={row.original.expectedDeliveryDate} showTime />,
  },
  {
    accessorKey: 'actualDeliveryDate',
    header: 'Actual Delivery Date',
    cell: ({ row }) => <DateCell value={row.original.actualDeliveryDate} showTime />,
  },
  {
    accessorKey: 'deliveryAddress',
    header: 'Delivery Address',
    cell: ({ row }) => <StringCell value={row.original.deliveryAddress} />,
  },
  {
    accessorKey: 'recipientName',
    header: 'Recipient Name',
    cell: ({ row }) => <StringCell value={row.original.recipientName} />,
  },
  {
    accessorKey: 'recipientContact',
    header: 'Recipient Contact',
    cell: ({ row }) => <StringCell value={row.original.recipientContact} />,
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => <StringCell value={row.original.notes} />,
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
