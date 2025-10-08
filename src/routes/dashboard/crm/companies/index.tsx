import { createFileRoute, useRouter } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { DataTable } from '@/components/table';
import { crmCompanyQueryOption } from '@/queries/crm/companies';
import { columns } from './-table';

export const Route = createFileRoute('/dashboard/crm/companies/')({
  ssr: false,
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({ page: z.number().default(1), perPage: z.number().default(10) }),
  ),
  beforeLoad: ({ search }) => ({ search }),
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData(
      crmCompanyQueryOption(context.search.page, context.search.perPage),
    );
  },
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const searchQuery = Route.useSearch();
  const data = Route.useLoaderData();

  return (
    <div className="grid grid-cols-12">
      <section className="col-span-12">
        <DataTable
          columns={columns}
          data={data}
          onNextPage={() => {
            navigate({
              search: (prev) => ({
                ...prev,
                page: searchQuery.page + 1,
              }),
            });
          }}
          onPreviousPage={() => {
            navigate({
              search: (prev) => ({
                ...prev,
                page: searchQuery.page - 1,
              }),
            });
          }}
          enablePreviousPage={searchQuery.page !== 1}
          enableNextPage={data.length !== 0}
        />
      </section>
    </div>
  );
}
