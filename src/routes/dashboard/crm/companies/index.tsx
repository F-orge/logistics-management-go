import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { selectCompanies } from '@/actions/crm/companies';
import DataTable from '@/components/ui/kibo-ui/table/data-table';
import { columns } from './-table';
import { selectSchema } from '@/lib/utils';
// import { selectCompaniesSchema } from '@/db/schemas/crm/companies';
import z from 'zod';

export const Route = createFileRoute('/dashboard/crm/companies/')({
  component: RouteComponent,
  validateSearch: zodValidator(selectSchema(z.object({}).keyof())),
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
          columns={columns}
          data={data}
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
        />
      </section>
    </article>
  );
}
