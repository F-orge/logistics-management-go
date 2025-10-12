import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateSalesOrder'][number]
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'orderNumber',
    header: 'Order Number',
    cell: ({ row }) => <StringCell value={row.original.orderNumber} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'orderDate',
    header: 'Order Date',
    cell: ({ row }) => <DateCell value={row.original.orderDate} showTime />,
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total Amount',
    cell: ({ row }) => <NumberCell value={row.original.totalAmount} />,
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
    cell: ({ row }) => <StringCell value={row.original.currency} />,
  },
  {
    accessorKey: 'customerName',
    header: 'Customer Name',
    cell: ({ row }) => <StringCell value={row.original.customerName} />,
  },
  {
    accessorKey: 'customerEmail',
    header: 'Customer Email',
    cell: ({ row }) => <StringCell value={row.original.customerEmail} />,
  },
  {
    accessorKey: 'shippingAddress',
    header: 'Shipping Address',
    cell: ({ row }) => <StringCell value={row.original.shippingAddress} />,
  },
  {
    accessorKey: 'billingAddress',
    header: 'Billing Address',
    cell: ({ row }) => <StringCell value={row.original.billingAddress} />,
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
