import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { toast } from 'sonner';
// import { selectCompaniesSchema } from '@/db/schemas/crm/companies';
import z from 'zod';
import { removeCompany, selectCompanies } from '@/actions/crm/companies';
import DeleteRecord from '@/components/dialogs/delete-record';
import {
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from '@/components/ui/context-menu';
import DataTable from '@/components/ui/kibo-ui/table/data-table';
import { selectClientQueryValidator } from '@/lib/utils';
import NewCrmCompanyRecord from './-new';
import { columns } from './-table';

export const Route = createFileRoute('/dashboard/crm/companies/')({
  ssr: false,
  component: RouteComponent,
  validateSearch: zodValidator(
    selectClientQueryValidator(z.object({}).keyof()),
  ),
  beforeLoad: ({ search }) => ({ search }),
  loader: ({ context }) => selectCompanies({ data: context.search }),
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const searchQuery = Route.useSearch();

  return (
    <article className="grid grid-cols-12 gap-2.5">
      <section className="col-span-full">
        <h4 className="text-2xl font-medium">Companies</h4>
      </section>
      <section className="col-span-full">
        <DataTable
          onNewRecord={() =>
            navigate({
              search: (prev) => ({
                ...prev,
                new: true,
              }),
            })
          }
          columns={columns}
          data={data}
          disablePrevPage={searchQuery.page === 1}
          onNextPage={() =>
            navigate({
              search: (prev) => ({ ...prev, page: searchQuery.page + 1 }),
            })
          }
          onPrevPage={() =>
            navigate({
              search: (prev) => ({ ...prev, page: searchQuery.page - 1 }),
            })
          }
          contextComponent={(row) => (
            <>
              <ContextMenuLabel>Actions</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuItem
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      id: row.original.id,
                      delete: true,
                    }),
                  })
                }
                variant="destructive"
              >
                Delete
              </ContextMenuItem>
            </>
          )}
        >
          {(row) => (
            <DeleteRecord
              title="Deleting record"
              description={`Are you sure you want to delete this record ${row.original.name}`}
              row={row}
              open={searchQuery.id === row.original.id && searchQuery.delete}
              onOpenChange={() =>
                navigate({
                  search: (prev) => ({
                    ...prev,
                    id: undefined,
                    delete: undefined,
                  }),
                })
              }
              onConfirm={async (row) =>
                toast.promise(
                  removeCompany({ data: { id: row.original.id } }),
                  {
                    success: { message: 'Delete Success' },
                    error: (err: Error) => {
                      return {
                        message: 'Unable to remove record',
                        description: err.message,
                      };
                    },
                  },
                )
              }
            />
          )}
        </DataTable>
      </section>
      <section>
        <NewCrmCompanyRecord />
      </section>
    </article>
  );
}
