import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/ui/kibo-ui/table/data-table';
import { pb } from '@/pocketbase';
import DeleteOrganizationDialog from './-actions/delete';
import EditOrganizationDialog from './-actions/edit';
import NewOrganizationDialog from './-actions/new';
import LoadingPage from './-loading';
import { columns } from './-table';

export const Route = createFileRoute('/dashboard/org/organization/')({
  component: RouteComponent,
  pendingComponent: LoadingPage,
  validateSearch: zodValidator(
    z.object({
      page: z.number().nonnegative().default(1).catch(1),
      perPage: z.number().nonnegative().default(10).catch(10),
      newOrganization: z.boolean().optional(),
      editOrganization: z.boolean().optional(),
      deleteOrganization: z.boolean().optional(),
      id: z.string().optional(),
      sort: z.array(z.string()).default(['-created']),
      filter: z.array(z.string()).optional(),
    }),
  ),
  beforeLoad: ({ search }) => ({ search }),
  preload: true,
  loader: ({ context }) =>
    pb
      .collection('org_organization')
      .getList(context.search.page, context.search.perPage, {
        sort: context.search.sort.join(' '),
        filter: context.search.filter?.join(' '),
      }),
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const searchParams = Route.useSearch();

  const organizations = Route.useLoaderData();

  return (
    <article className="grid grid-cols-12 gap-2.5">
      <section className="col-span-full">
        {/* Heading */}
        <h1 className="text-3xl font-medium border-b pb-4">Organizations</h1>
      </section>
      <section>{/* Key statistics */}</section>
      <section className="flex flex-row justify-end col-span-full">
        {/* Table actions */}
        <Button
          onClick={() =>
            navigate({
              search: (prev) => ({ ...prev, newOrganization: true }),
            })
          }
          variant={'outline'}
        >
          Create Organization
        </Button>
      </section>
      <section className="col-span-full">
        <DataTable columns={columns} data={organizations} />
      </section>
      <section>
        {/* Action dialogs */}
        {searchParams.newOrganization && <NewOrganizationDialog />}
        {searchParams.editOrganization && <EditOrganizationDialog />}
        {searchParams.deleteOrganization && <DeleteOrganizationDialog />}
      </section>
    </article>
  );
}
