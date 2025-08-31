import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/ui/kibo-ui/table/data-table';
import { pb } from '@/pocketbase';
import DeleteVehicleDialog from './-actions/delete';
import EditVehicleDialog from './-actions/edit';
import NewVehicleDialog from './-actions/new';
import LoadingPage from './-loading';
import { columns } from './-table';

export const Route = createFileRoute('/dashboard/tms/vehicles/')({
  component: RouteComponent,
  pendingComponent: LoadingPage,
  validateSearch: zodValidator(
    z.object({
      page: z.number().nonnegative().default(1).catch(1),
      perPage: z.number().nonnegative().default(10).catch(10),
      newVehicle: z.boolean().optional(),
      editVehicle: z.boolean().optional(),
      deleteVehicle: z.boolean().optional(),
      id: z.string().optional(),
      sort: z.array(z.string()).default(['-created']),
      filter: z.array(z.string()).optional(),
    }),
  ),
  beforeLoad: ({ search }) => ({ search }),
  preload: true,
  loader: ({ context }) =>
    pb
      .collection('tms_vehicles')
      .getList(context.search.page, context.search.perPage, {
        sort: context.search.sort.join(' '),
        filter: context.search.filter?.join(' '),
      }),
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const searchParams = Route.useSearch();
  const vehicles = Route.useLoaderData();

  return (
    <article className="grid grid-cols-12 gap-2.5">
      <section className="col-span-full">
        {/* Heading */}
        <h1 className="text-3xl font-medium border-b pb-4">Vehicles</h1>
      </section>
      <section>{/* Key statistics */}</section>
      <section className="flex flex-row justify-end col-span-full">
        {/* Table actions */}
        <Button
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, newVehicle: true }) })
          }
          variant={'outline'}
        >
          Create Vehicle
        </Button>
      </section>
      <section className="col-span-full">
        <DataTable columns={columns} data={vehicles} />
      </section>
      <section>
        {/* Action dialogs */}
        {searchParams.newVehicle && <NewVehicleDialog />}
        {searchParams.editVehicle && <EditVehicleDialog />}
        {searchParams.deleteVehicle && <DeleteVehicleDialog />}
      </section>
    </article>
  );
}
