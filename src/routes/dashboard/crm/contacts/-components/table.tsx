import DateCell from '@/components/table/cells/date';
import PhoneCell from '@/components/table/cells/phone';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { orpcClient } from '@/orpc/client';
import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<
  Awaited<ReturnType<typeof orpcClient.crm.paginateContact>>[number] & {
    company:
      | Awaited<ReturnType<typeof orpcClient.crm.inCompany>>[number]
      | null;
  }
>[] = [
  {
    accessorKey: 'name',
    header: 'Contact Name',
    cell: ({ row }) => {
      return <StringCell value={row.original.name} />;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <StringCell value={row.original.email} />,
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => <PhoneCell value={row.original.phoneNumber} />,
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
              <StringCell value={row.original.company?.name} />
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
    header: 'Job Title',
    cell: ({ row }) => <StringCell value={row.original.jobTitle} />,
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
