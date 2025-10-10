import { DataTable } from '@/components/table';
import { paginateCompany, rangeCompany } from '@/queries/crm/companies';
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
import { crmCompanySchema } from '@/schemas/crm/companies';

export const Route = createFileRoute('/dashboard/crm/companies/')({
  component: RouteComponent,
  validateSearch: zodValidator(
    paginateTransformer().extend({
      filters: filterTransformer(crmCompanySchema),
      sort: sortTransformer(crmCompanySchema),
    }),
  ),
  beforeLoad: (ctx) => ({ search: ctx.search }),
  async loader({ context }) {
    const from = new Date();
    const to = new Date();
    to.setFullYear(from.getFullYear() + 1);

    return {
      dataTable: await context.queryClient.fetchQuery(
        paginateCompany(context.search),
      ),
      chart: await context.queryClient.fetchQuery(rangeCompany({ from, to })),
    };
  },
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const searchQuery = Route.useSearch();
  const data = Route.useLoaderData();

  return (
    <article className="grid grid-cols-12 gap-5">
      <section className="col-span-full">
        <h1 className="text-2xl font-bold">Companies</h1>
      </section>
      <section className="col-span-full flex justify-between items-center">
        <ButtonGroup className="col-span-4">
          <Input placeholder="Search..." />
          <Button variant="outline" aria-label="Search">
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
        <DataTable data={data.dataTable} columns={columns}></DataTable>
      </section>
    </article>
  );
}
