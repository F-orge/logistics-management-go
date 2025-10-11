import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import NumberCell from '@/components/table/cells/number';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateVehicle'][number]
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'licensePlate',
    header: 'License Plate',
    cell: ({ row }) => <StringCell value={row.original.licensePlate} />,
  },
  {
    accessorKey: 'make',
    header: 'Make',
    cell: ({ row }) => <StringCell value={row.original.make} />,
  },
  {
    accessorKey: 'model',
    header: 'Model',
    cell: ({ row }) => <StringCell value={row.original.model} />,
  },
  {
    accessorKey: 'year',
    header: 'Year',
    cell: ({ row }) => <NumberCell value={row.original.year} />,
  },
  {
    accessorKey: 'vin',
    header: 'VIN',
    cell: ({ row }) => <StringCell value={row.original.vin} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'currentMileage',
    header: 'Current Mileage',
    cell: ({ row }) => <NumberCell value={row.original.currentMileage} />,
  },
  {
    accessorKey: 'lastMaintenanceDate',
    header: 'Last Maintenance Date',
    cell: ({ row }) => <DateCell value={row.original.lastMaintenanceDate} showTime />,
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
