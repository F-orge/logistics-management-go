import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import NumberCell from '@/components/table/cells/number'
import StringCell from '@/components/table/cells/string'
import { Button } from '@/components/ui/button'
import type { ORPCOutputs } from '@/orpc/client'

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateExpense'][number] & {
    trip?: ORPCOutputs['tms']['inTrip'][number]
    driver?: ORPCOutputs['tms']['inDriver'][number]
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'trip',
    header: 'Trip',
    cell: ({ row }) =>
      row.original.trip ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/trip"
            search={{
              view: true,
              id: row.original.trip.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.trip.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.trip.id} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
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
    accessorKey: 'expenseType',
    header: 'Expense Type',
    cell: ({ row }) => <StringCell value={row.original.expenseType} />,
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => <NumberCell value={row.original.amount} />,
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
    cell: ({ row }) => <StringCell value={row.original.currency} />,
  },
  {
    accessorKey: 'expenseDate',
    header: 'Expense Date',
    cell: ({ row }) => <DateCell value={row.original.expenseDate} showTime />,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <StringCell value={row.original.description} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'fuelQuantity',
    header: 'Fuel Quantity',
    cell: ({ row }) => <NumberCell value={row.original.fuelQuantity} />,
  },
  {
    accessorKey: 'odometerReading',
    header: 'Odometer Reading',
    cell: ({ row }) => <NumberCell value={row.original.odometerReading} />,
  },
  {
    accessorKey: 'receiptUrl',
    header: 'Receipt URL',
    cell: ({ row }) => <StringCell value={row.original.receiptUrl} />,
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
]
