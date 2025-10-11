import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { orpcClient, ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['crm']['paginateInteraction'][number] & {
    contact?: ORPCOutputs['crm']['inContact'][number];
    case?: ORPCOutputs['crm']['inCase'][number];
    user?: ORPCOutputs['auth']['inUser'][number];
  }
>[] = [
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
    accessorFn: (row) => row.case?.caseNumber,
    header: 'Case',
    cell: ({ row }) => (
      <>
        {row.original.case ? (
          <Button size={'sm'} variant={'outline'} className="w-full" asChild>
            <Link
              to="/dashboard/crm/cases"
              search={{
                view: true,
                id: row.original.case.id,
                filters: [
                  {
                    column: 'id',
                    operation: '=',
                    value: row.original.case.id,
                  },
                ],
              }}
            >
              <StringCell value={row.original.case?.caseNumber} />
            </Link>
          </Button>
        ) : (
          <StringCell value={'Not Available'} />
        )}
      </>
    ),
  },
  {
    accessorKey: 'userId',
    header: 'User Name',
    cell: ({ row }) => <StringCell value={row.original.user?.name} />,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <StringCell value={row.original.type} />,
  },
  {
    accessorKey: 'interactionDate',
    header: 'Interaction Date',
    cell: ({ row }) => (
      <DateCell value={row.original.interactionDate} showTime />
    ),
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => <StringCell value={row.original.notes} />,
  },
  {
    accessorKey: 'outcome',
    header: 'Outcome',
    cell: ({ row }) => <StringCell value={row.original.outcome} />,
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
