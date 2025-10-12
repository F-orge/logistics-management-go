import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { BillingPricingModelEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateRateRule'][number] & {
    rateCard?: ORPCOutputs['billing']['inRateCard'][number];
  }
>[] = [
  {
    accessorKey: 'condition',
    header: 'Condition',
    cell: ({ row }) => <StringCell value={row.original.condition} />,
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => <StringCell value={row.original.value} />,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => <NumberCell value={row.original.price} />,
  },
  {
    accessorKey: 'pricingModel',
    header: 'Pricing Model',
    cell: ({ row }) => <StringCell value={row.original.pricingModel} />,
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => <NumberCell value={row.original.priority} />,
  },
  {
    accessorKey: 'minValue',
    header: 'Min Value',
    cell: ({ row }) => <NumberCell value={row.original.minValue} />,
  },
  {
    accessorKey: 'maxValue',
    header: 'Max Value',
    cell: ({ row }) => <NumberCell value={row.original.maxValue} />,
  },
  {
    accessorKey: 'isActive',
    header: 'Active',
    cell: ({ row }) => <StringCell value={row.original.isActive ? 'Yes' : 'No'} />,
  },
  {
    id: 'rateCard',
    header: 'Rate Card',
    cell: ({ row }) =>
      row.original.rateCard ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/billing/rate-cards"
            search={{
              view: true,
              id: row.original.rateCard.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.rateCard.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.rateCard.name} />
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
