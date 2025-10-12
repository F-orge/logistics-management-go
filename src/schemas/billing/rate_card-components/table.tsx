import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { BillingServiceTypeEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateRateCard'][number] & {
    createdBy?: ORPCOutputs['auth']['inUser'][number];
  }
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <StringCell value={row.original.name} />,
  },
  {
    accessorKey: 'serviceType',
    header: 'Service Type',
    cell: ({ row }) => <StringCell value={row.original.serviceType} />,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <StringCell value={row.original.description} />,
  },
  {
    accessorKey: 'isActive',
    header: 'Active',
    cell: ({ row }) => <StringCell value={row.original.isActive ? 'Yes' : 'No'} />,
  },
  {
    accessorKey: 'validFrom',
    header: 'Valid From',
    cell: ({ row }) => <DateCell value={row.original.validFrom} showTime />,
  },
  {
    accessorKey: 'validTo',
    header: 'Valid To',
    cell: ({ row }) => <DateCell value={row.original.validTo} showTime />,
  },
  {
    id: 'createdBy',
    header: 'Created By',
    cell: ({ row }) =>
      row.original.createdBy ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/auth/users"
            search={{
              view: true,
              id: row.original.createdBy.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.createdBy.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.createdBy.name} />
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
