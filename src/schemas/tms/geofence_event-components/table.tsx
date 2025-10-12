import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { TmsGeofenceEventTypeEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateGeofenceEvent'][number] & {
    vehicle?: ORPCOutputs['tms']['inVehicle'][number];
    geofence?: ORPCOutputs['tms']['inGeofence'][number];
  }
>[] = [
  {
    accessorKey: 'eventType',
    header: 'Event Type',
    cell: ({ row }) => <StringCell value={row.original.eventType} />,
  },
  {
    accessorKey: 'timestamp',
    header: 'Timestamp',
    cell: ({ row }) => <DateCell value={row.original.timestamp} showTime />,
  },
  {
    id: 'vehicle',
    header: 'Vehicle',
    cell: ({ row }) =>
      row.original.vehicle ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/vehicles"
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
    id: 'geofence',
    header: 'Geofence',
    cell: ({ row }) =>
      row.original.geofence ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/geofences"
            search={{
              view: true,
              id: row.original.geofence.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.geofence.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.geofence.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
];
