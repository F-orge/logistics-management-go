import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { TmsProofTypeEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateProofOfDelivery'][number] & {
    tripStop?: ORPCOutputs['tms']['inTripStop'][number];
  }
>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <StringCell value={row.original.type} />,
  },
  {
    accessorKey: 'filePath',
    header: 'File Path',
    cell: ({ row }) =>
      row.original.filePath ? (
        <a href={row.original.filePath} target="_blank" rel="noopener noreferrer">
          <StringCell value="View File" />
        </a>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'latitude',
    header: 'Latitude',
    cell: ({ row }) => <NumberCell value={row.original.latitude} />,
  },
  {
    accessorKey: 'longitude',
    header: 'Longitude',
    cell: ({ row }) => <NumberCell value={row.original.longitude} />,
  },
  {
    accessorKey: 'timestamp',
    header: 'Timestamp',
    cell: ({ row }) => <DateCell value={row.original.timestamp} showTime />,
  },
  {
    id: 'tripStop',
    header: 'Trip Stop',
    cell: ({ row }) =>
      row.original.tripStop ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/trip-stops"
            search={{
              view: true,
              id: row.original.tripStop.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.tripStop.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.tripStop.id} />
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
