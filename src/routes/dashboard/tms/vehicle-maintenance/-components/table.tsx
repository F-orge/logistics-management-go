import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import NumberCell from '@/components/table/cells/number';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateVehicleMaintenance'][number] & {
    vehicle?: ORPCOutputs['tms']['inVehicle'][number];
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
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
    accessorKey: 'maintenanceType',
    header: 'Maintenance Type',
    cell: ({ row }) => <StringCell value={row.original.maintenanceType} />,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <StringCell value={row.original.description} />,
  },
  {
    accessorKey: 'cost',
    header: 'Cost',
    cell: ({ row }) => <NumberCell value={row.original.cost} />,
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
    cell: ({ row }) => <StringCell value={row.original.currency} />,
  },
  {
    accessorKey: 'maintenanceDate',
    header: 'Maintenance Date',
    cell: ({ row }) => <DateCell value={row.original.maintenanceDate} showTime />,
  },
  {
    accessorKey: 'nextMaintenanceDate',
    header: 'Next Maintenance Date',
    cell: ({ row }) => <DateCell value={row.original.nextMaintenanceDate} showTime />,
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
