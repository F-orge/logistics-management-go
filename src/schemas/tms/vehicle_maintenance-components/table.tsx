import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { TmsVehicleServiceTypeEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateVehicleMaintenance'][number] & {
    vehicle?: ORPCOutputs['tms']['inVehicle'][number];
  }
>[] = [
  {
    accessorKey: 'cost',
    header: 'Cost',
    cell: ({ row }) => <NumberCell value={row.original.cost} />,
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => <StringCell value={row.original.notes} />,
  },
  {
    accessorKey: 'serviceDate',
    header: 'Service Date',
    cell: ({ row }) => <DateCell value={row.original.serviceDate} showTime />,
  },
  {
    accessorKey: 'serviceType',
    header: 'Service Type',
    cell: ({ row }) => <StringCell value={row.original.serviceType} />,
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
