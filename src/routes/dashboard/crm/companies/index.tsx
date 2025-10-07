import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import DataTable from '@/components/ui/kibo-ui/table/data-table';
import { crmCompanyQueryOption } from '@/queries/crm/companies';
import { columns } from './-table';

export const Route = createFileRoute('/dashboard/crm/companies/')({
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
  const data = Route.useLoaderData();

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
