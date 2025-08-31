import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/ui/kibo-ui/table/data-table';
import { pb } from '@/pocketbase';
import DeleteDriverDialog from './-actions/delete';
import EditDriverDialog from './-actions/edit';
import NewDriverDialog from './-actions/new';
import LoadingPage from './-loading';
import { columns } from './-table';

export const Route = createFileRoute('/dashboard/tms/drivers/')({
  component: RouteComponent,
  pendingComponent: LoadingPage,
  validateSearch: zodValidator(
    z.object({
      page: z.number().nonnegative().default(1).catch(1),
      perPage: z.number().nonnegative().default(10).catch(10),
      newDriver: z.boolean().optional(),
      editDriver: z.boolean().optional(),
      deleteDriver: z.boolean().optional(),
      id: z.string().optional(),
      sort: z.array(z.string()).default(['-created']),
      filter: z.array(z.string()).optional(),
    }),
  ),
  beforeLoad: ({ search }) => ({ search }),
  preload: true,
  loader: ({ context }) =>
    pb
      .collection('tms_drivers')
      .getList(context.search.page, context.search.perPage, {
        sort: context.search.sort.join(' '),
        filter: context.search.filter?.join(' '),
      }),
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const searchParams = Route.useSearch();
  const drivers = Route.useLoaderData();

  return (
    <article className="grid grid-cols-12 gap-2.5">
      <section className="col-span-full">
        {/* Heading */}
        <h1 className="text-3xl font-medium border-b pb-4">Drivers</h1>
      </section>
      <section>{/* Key statistics */}</section>
      <section className="flex flex-row justify-end col-span-full">
        {/* Table actions */}
        <Button
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, newDriver: true }) })
          }
          variant={'outline'}
        >
          Create Driver
        </Button>
      </section>
      <section className="col-span-full">
        <DataTable columns={columns} data={drivers} />
      </section>
      <section>
        {/* Action dialogs */}
        {searchParams.newDriver && <NewDriverDialog />}
        {searchParams.editDriver && <EditDriverDialog />}
        {searchParams.deleteDriver && <DeleteDriverDialog />}
      </section>
    </article>
  );
}
