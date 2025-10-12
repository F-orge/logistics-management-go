import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { TmsDriverScheduleReasonEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateDriverSchedule'][number] & {
    driver?: ORPCOutputs['tms']['inDriver'][number];
  }
>[] = [
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => <DateCell value={row.original.startDate} showTime />,
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => <DateCell value={row.original.endDate} showTime />,
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ row }) => <StringCell value={row.original.reason} />,
  },
  {
    id: 'driver',
    header: 'Driver',
    cell: ({ row }) =>
      row.original.driver ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/drivers"
            search={{
              view: true,
              id: row.original.driver.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.driver.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.driver.name} />
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
