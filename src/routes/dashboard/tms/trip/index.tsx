import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import {
  MoreHorizontal,
  Pencil,
  Plus,
  ScanSearch,
  SearchIcon,
  Trash,
} from 'lucide-react';
import { useState } from 'react';
import z from 'zod';
import { DataTable } from '@/components/table';
import DeleteRecordDialog from '@/components/table/dialogs/delete';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  ContextMenuItem,
  ContextMenuSeparator,
} from '@/components/ui/context-menu';
import { Input } from '@/components/ui/input';
import { deleteTrip, paginateTrip, rangeTrip } from '@/queries/tms/trip';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import { tmsTripSchema } from '@/schemas/tms/trip';
import NewTripFormDialog from './-components/new';
import { columns } from './-components/table';

export const Route = createFileRoute('/dashboard/tms/trip/')({
  component: RouteComponent,
  validateSearch: zodValidator(
    paginateTransformer().extend({
      filters: filterTransformer(tmsTripSchema),
      sort: sortTransformer(tmsTripSchema).default([
        { column: 'createdAt', order: 'desc' },
      ]),
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

    return {
      dataTable: await context.queryClient.fetchQuery(
        paginateTrip(context.search),
      ),
      chart: await context.queryClient.fetchQuery(rangeTrip({ from, to })),
    };
  },
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const searchQuery = Route.useSearch();
  const data = Route.useLoaderData();
  const { queryClient } = Route.useRouteContext();
  const [currentSearch, setCurrentSearch] = useState<string>('');

  const deleteMutation = useMutation(deleteTrip, queryClient);

  return (
    <article className="grid grid-cols-12 gap-5">
      <section className="col-span-full">
        <h1 className="text-2xl font-bold">Trips</h1>
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
                      column: 'status',
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
          }}
          onPreviousPage={() => {
            navigate({
              search: (prev) => ({ ...prev, page: prev.page - 1 }),
              replace: true,
            });
          }}
          enableNextPage={data.dataTable.length !== 0}
          enablePreviousPage={searchQuery.page !== 1}
        >
          {(row) => (
            <>
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
                <Trash />
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
            deleteMutation.mutateAsync(searchQuery.id!, {
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
            })
          }
        />
      </section>
      <section>
        <NewTripFormDialog />
      </section>
    </article>
  );
}
