import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/table';
import StringCell from '@/components/table/cells/string';
import { ORPCOutputs } from '@/orpc/client';
import DateCell from '@/components/table/cells/date';

export const columns: ColumnDef<
  ORPCOutputs['crm']['paginateContact'][number] & {
    company?: ORPCOutputs['crm']['inCompany'][number];
  }
>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Name" />
    ),
    cell: ({ row }) => {
      return <StringCell value={row.original.name} />;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <StringCell value={row.original.email} />,
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => <StringCell value={row.original.phoneNumber} />,
  },
  {
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => (
      <>
        {row.original.company ? (
          <Button size={'sm'} variant={'outline'} className="w-full" asChild>
            <Link
              to="/dashboard/crm/companies"
              search={{
                view: true,
                id: row.original.company.id,
                filters: [
                  {
                    column: 'id',
                    operation: '=',
                    value: row.original.company.id,
                  },
                ],
              }}
            >
              {row.original.company?.name}
            </Link>
          </Button>
        ) : (
          <StringCell value={'Not Available'} />
        )}
      </>
    ),
  },
  {
    accessorKey: 'jobTitle',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
    cell: ({ row }) => <StringCell value={row.original.jobTitle} />,
  },
  {
    accessorKey: 'ownerId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner ID" />
    ),
    cell: ({ row }) => <StringCell value={row.original.ownerId} />,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => <DateCell value={row.original.createdAt} />,
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => <DateCell value={row.original.updatedAt} />,
  },
];
