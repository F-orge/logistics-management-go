import { DataTable } from '@/components/table';
import { deleteCase, paginateCase, rangeCase } from '@/queries/crm/cases';
import { createFileRoute } from '@tanstack/react-router';
import { columns } from './-components/table';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Plus, SearchIcon } from 'lucide-react';
import { zodValidator } from '@tanstack/zod-adapter';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import { crmCaseSchema } from '@/schemas/crm/cases';
import { useState } from 'react';
import z from 'zod';
import NewCaseFormDialog from './-components/new';
import { ContextMenuItem, ContextMenuSeparator } from '@/components/ui/context-menu';
import DeleteRecordDialog from '@/components/table/dialogs/delete';
import { useMutation } from '@tanstack/react-query';
import ViewCaseFormDialog from './-components/view';
import { ScanSearch, Pencil } from 'lucide-react';
import { inContact } from '@/queries/crm';

export const Route = createFileRoute('/dashboard/crm/cases/')({
  component: RouteComponent,
  validateSearch: zodValidator(
    paginateTransformer().extend({
      filters: filterTransformer(crmCaseSchema),
      sort: sortTransformer(crmCaseSchema),
      new: z.boolean().optional(),
      delete: z.boolean().optional(),
      view: z.boolean().optional(),
      edit: z.boolean().optional(),
      id: z.string().optional(),
    }),
  ),
  beforeLoad: (ctx) => ({ search: ctx.search }),
  async loader({ context }) {
    const from = new Date();
    const to = new Date();
    to.setFullYear(from.getFullYear() + 1);

    const cases = await context.queryClient.fetchQuery(
      paginateCase(context.search),
    );

    // contacts
    const contactIds = cases
      .map((row) => row.contactId)
      .filter((id) => id !== null && id !== undefined);

    const contacts = await context.queryClient.fetchQuery(
      inContact(contactIds),
    );

    // Create a map for quick lookup
    const contactMap = new Map(
      contacts.map((contact) => [contact.id, contact]),
    );

    // Merge contact data into each row
    const dataTable = cases.map((row) => ({
      ...row,
      contact: row.contactId ? (contactMap.get(row.contactId) ?? null) : null,
    }));

    return {
      dataTable,
      chart: await context.queryClient.fetchQuery(rangeCase({ from, to })),
    };
  },
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const searchQuery = Route.useSearch();
  const data = Route.useLoaderData();
  const { queryClient } = Route.useRouteContext();
  const [currentSearch, setCurrentSearch] = useState<string>();

  const deleteMutation = useMutation(deleteCase, queryClient);

  return (
    <article className="grid grid-cols-12 gap-5">
      <section className="col-span-full">
        <h1 className="text-2xl font-bold">Cases</h1>
      </section>
      <section className="col-span-full flex justify-between items-center">
        <ButtonGroup className="col-span-4">
          <Input
            onChange={(e) => setCurrentSearch(e.target.value)}
            placeholder="Search..."
          />
          <Button
            onClick={() =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  filters: [
                    {
                      column: 'caseNumber',
                      operation: 'like',
                      value: `%${currentSearch}%`,
                    },
                  ],
                }),
              })
            }
            variant="outline"
            aria-label="Search"
          >
            <SearchIcon />
          </Button>
        </ButtonGroup>
        <ButtonGroup className="col-span-6 col-start-10">
          <Button
            onClick={() => {
              navigate({
                search: (prev) => ({
                  ...prev,
                  new: true,
                }),
              });
            }}
            variant={'outline'}
          >
            Create
            <Plus />
          </Button>
          <Button variant={'outline'} size={'icon'}>
            <MoreHorizontal />
          </Button>
        </ButtonGroup>
      </section>
      <section className="col-span-full">
        <DataTable
          data={data.dataTable}
          columns={columns}
          onNextPage={() => {
            navigate({
              search: (prev) => ({ ...prev, page: prev.page + 1 }),
              replace: true,
            });
            queryClient.invalidateQueries();
          }}
          onPreviousPage={() => {
            navigate({
              search: (prev) => ({ ...prev, page: prev.page - 1 }),
              replace: true,
            });
            queryClient.invalidateQueries();
          }}
          enableNextPage={data.dataTable.length !== 0}
          enablePreviousPage={searchQuery.page !== 1}
        >
          {(row) => (
            <>
              <ContextMenuItem
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      view: true,
                      id: row.original.id,
                    }),
                  })
                }
              >
                <ScanSearch />
                View Information
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      edit: true,
                      id: row.original.id,
                    }),
                  })
                }
              >
                <Pencil />
                Edit Information
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      delete: true,
                      id: row.original.id,
                    }),
                    replace: true,
                  })
                }
                variant="destructive"
              >
                Delete
              </ContextMenuItem>
            </>
          )}
        </DataTable>
      </section>
      <section>
        <DeleteRecordDialog
          open={searchQuery.delete}
          onOpenChange={() =>
            navigate({
              search: (prev) => ({ ...prev, delete: undefined, id: undefined }),
              replace: true,
            })
          }
          title="Are you sure you want to delete this record"
          description="Deleting this record is permanent"
          onConfirm={async () =>
            deleteMutation.mutateAsync(searchQuery.id!,
              {
                onSuccess: () => {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      delete: undefined,
                      id: undefined,
                    }),
                    replace: true,
                  });
                },
                onError: () => {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      delete: undefined,
                      id: undefined,
                    }),
                    replace: true,
                  });
                },
              },
            )
          }
        />
        <NewCaseFormDialog />
        <ViewCaseFormDialog />
      </section>
    </article>
  );
}
