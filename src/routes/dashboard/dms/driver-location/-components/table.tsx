import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['dms']['paginateDriverLocation'][number]
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'driverId',
    header: 'Driver ID',
    cell: ({ row }) => (
      <Button size={'sm'} variant={'outline'} className="w-full" asChild>
        <Link
          to="/dashboard/tms/driver"
          search={{
            view: true,
            id: row.original.driverId,
            filters: [
              {
                column: 'id',
                operation: '=',
                value: row.original.driverId,
              },
            ],
          }}
        >
          <StringCell value={row.original.driverId} />
        </Link>
      </Button>
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
    accessorKey: 'accuracy',
    header: 'Accuracy',
    cell: ({ row }) => <NumberCell value={row.original.accuracy} />,
  },
  {
    accessorKey: 'altitude',
    header: 'Altitude',
    cell: ({ row }) => <NumberCell value={row.original.altitude} />,
  },
  {
    accessorKey: 'heading',
    header: 'Heading',
    cell: ({ row }) => <NumberCell value={row.original.heading} />,
  },
  {
    accessorKey: 'speedKmh',
    header: 'Speed (Km/h)',
    cell: ({ row }) => <NumberCell value={row.original.speedKmh} />,
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
