import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateDriver'][number] & {
    user?: ORPCOutputs['auth']['inUser'][number];
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) =>
      row.original.user ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/auth/users"
            search={{
              view: true,
              id: row.original.user.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.user.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.user.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'licenseNumber',
    header: 'License Number',
    cell: ({ row }) => <StringCell value={row.original.licenseNumber} />,
  },
  {
    accessorKey: 'licenseExpiryDate',
    header: 'License Expiry Date',
    cell: ({ row }) => (
      <DateCell value={row.original.licenseExpiryDate} showTime />
    ),
  },
  {
    accessorKey: 'contactNumber',
    header: 'Contact Number',
    cell: ({ row }) => <StringCell value={row.original.contactNumber} />,
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
