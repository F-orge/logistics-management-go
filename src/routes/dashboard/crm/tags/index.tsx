import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import DataTable from '@/components/ui/kibo-ui/table/data-table';
import { crmTagQueryOption } from '@/queries/crm/tags';
import { columns } from './-table';

export const Route = createFileRoute('/dashboard/crm/tags/')({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({ page: z.number().default(1), perPage: z.number().default(10) }),
  ),
  beforeLoad: ({ search }) => ({ search }),
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData(
      crmTagQueryOption(context.search.page, context.search.perPage),
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
