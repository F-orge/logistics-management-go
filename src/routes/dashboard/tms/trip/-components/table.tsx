import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateTrip'][number] & {
    driver?: ORPCOutputs['tms']['inDriver'][number];
    vehicle?: ORPCOutputs['tms']['inVehicle'][number];
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'driver',
    header: 'Driver',
    cell: ({ row }) =>
      row.original.driver ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/driver"
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
            <StringCell value={row.original.driver.id} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'vehicle',
    header: 'Vehicle',
    cell: ({ row }) =>
      row.original.vehicle ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/vehicle"
            search={{
              view: true,
              id: row.original.vehicle.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.vehicle.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.vehicle.licensePlate} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
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
