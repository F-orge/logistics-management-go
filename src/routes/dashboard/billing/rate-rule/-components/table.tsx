import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import NumberCell from '@/components/table/cells/number';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateRateRule'][number] & {
    rateCard?: ORPCOutputs['billing']['inRateCard'][number];
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'rateCard',
    header: 'Rate Card',
    cell: ({ row }) =>
      row.original.rateCard ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/billing/rate-card"
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
    accessorKey: 'ruleType',
    header: 'Rule Type',
    cell: ({ row }) => <StringCell value={row.original.ruleType} />,
  },
  {
    accessorKey: 'condition',
    header: 'Condition',
    cell: ({ row }) => <StringCell value={row.original.condition} />,
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => <NumberCell value={row.original.value} />,
  },
  {
    accessorKey: 'unit',
    header: 'Unit',
    cell: ({ row }) => <StringCell value={row.original.unit} />,
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
