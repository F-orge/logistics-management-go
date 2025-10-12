import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { ORPCOutputs } from '@/orpc/client';
import { BillingSurchargeCalculationMethodEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateSurcharge'][number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <StringCell value={row.original.name} />,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <StringCell value={row.original.type} />,
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => <NumberCell value={row.original.amount} />,
  },
  {
    accessorKey: 'calculationMethod',
    header: 'Calculation Method',
    cell: ({ row }) => <StringCell value={row.original.calculationMethod} />,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <StringCell value={row.original.description} />,
  },
  {
    accessorKey: 'isActive',
    header: 'Active',
    cell: ({ row }) => <StringCell value={row.original.isActive ? 'Yes' : 'No'} />,
  },
  {
    accessorKey: 'validFrom',
    header: 'Valid From',
    cell: ({ row }) => <DateCell value={row.original.validFrom} showTime />,
  },
  {
    accessorKey: 'validTo',
    header: 'Valid To',
    cell: ({ row }) => <DateCell value={row.original.validTo} showTime />,
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
