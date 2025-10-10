import { DataTable } from '@/components/table';
import { paginateLead, rangeLead } from '@/queries/crm/leads';
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
import { crmLeadSchema } from '@/schemas/crm/leads';
import { useState } from 'react';

export const Route = createFileRoute('/dashboard/crm/leads/')({
  component: RouteComponent,
  validateSearch: zodValidator(
    paginateTransformer().extend({
      filters: filterTransformer(crmLeadSchema),
      sort: sortTransformer(crmLeadSchema),
    }),
  ),
  beforeLoad: (ctx) => ({ search: ctx.search }),
  async loader({ context }) {
    const from = new Date();
    const to = new Date();
    to.setFullYear(from.getFullYear() + 1);

    return {
      dataTable: await context.queryClient.fetchQuery(
        paginateLead(context.search),
      ),
      chart: await context.queryClient.fetchQuery(rangeLead({ from, to })),
    };
  },
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const searchQuery = Route.useSearch();
  const data = Route.useLoaderData();
  const { queryClient } = Route.useRouteContext();
  const [currentSearch, setCurrentSearch] = useState<string>();

  return (
    <article className="grid grid-cols-12 gap-5">
      <section className="col-span-full">
        <h1 className="text-2xl font-bold">Leads</h1>
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
                      column: 'name',
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
          <Button variant={'outline'}>
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
        />
      </section>
    </article>
  );
}
