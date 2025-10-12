import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs, orpcClient } from '@/orpc/client';
import { CrmContact } from '@/schemas/crm/contacts';

export const columns: ColumnDef<
  ORPCOutputs['crm']['paginateCase'][number] & {
    contact: ORPCOutputs['crm']['inContact'][number] | undefined;
  }
>[] = [
  {
    accessorKey: 'caseNumber',
    header: 'Case Number',
    cell: ({ row }) => {
      return <StringCell value={row.original.caseNumber} />;
    },
  },
  {
    accessorKey: 'contact.name',
    header: 'Contact',
    cell: ({ row }) => (
      <>
        {row.original.contact ? (
          <Button size={'sm'} variant={'outline'} className="w-full" asChild>
            <Link
              to="/dashboard/crm/contacts"
              search={{
                view: true,
                id: row.original.contact.id,
                filters: [
                  {
                    column: 'id',
                    operation: '=',
                    value: row.original.contact.id,
                  },
                ],
              }}
            >
              <StringCell value={row.original.contact?.name} />
            </Link>
          </Button>
        ) : (
          <StringCell value={'Not Available'} />
        )}
      </>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <StringCell value={row.original.description} />,
  },
  {
    accessorKey: 'ownerId',
    header: 'Owner ID',
    cell: ({ row }) => <StringCell value={row.original.ownerId} />,
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => <StringCell value={row.original.priority} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <StringCell value={row.original.type} />,
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
