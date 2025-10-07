import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import DataTable from '@/components/ui/kibo-ui/table/data-table';
import { crmCaseQueryOption } from '@/queries/crm/cases';
import { columns } from './-table';

export const Route = createFileRoute('/dashboard/crm/cases/')({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({ page: z.number().default(1), perPage: z.number().default(10) }),
  ),
  beforeLoad: ({ search }) => ({ search }),
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData(
      crmCaseQueryOption(context.search.page, context.search.perPage),
    );
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div className="grid grid-cols-12">
      <section className="col-span-12">
        <DataTable columns={columns} data={data} />
      </section>
    </div>
  );
}