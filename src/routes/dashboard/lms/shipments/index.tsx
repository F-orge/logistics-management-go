import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/ui/kibo-ui/table/data-table';
import { pb } from '@/pocketbase';
import DeleteShipmentDialog from './-actions/delete';
import EditShipmentDialog from './-actions/edit';
import NewShipmentDialog from './-actions/new';
import LoadingPage from './-loading';
import { columns, type ShipmentWithExpands } from './-table';

export const Route = createFileRoute('/dashboard/lms/shipments/')({
  component: RouteComponent,
  pendingComponent: LoadingPage,
  validateSearch: zodValidator(
    z.object({
      page: z.number().nonnegative().default(1).catch(1),
      perPage: z.number().nonnegative().default(10).catch(10),
      newShipment: z.boolean().optional(),
      editShipment: z.boolean().optional(),
      deleteShipment: z.boolean().optional(),
      id: z.string().optional(),
      sort: z.array(z.string()).default(['-created']),
      filter: z.array(z.string()).optional(),
    }),
  ),
  beforeLoad: ({ search }) => ({ search }),
  preload: true,
  loader: ({ context }) =>
    pb
      .collection('lms_shipments')
      .getList<ShipmentWithExpands>(
        context.search.page,
        context.search.perPage,
        {
          sort: context.search.sort.join(' '),
          filter: context.search.filter?.join(' '),
          expand:
            'sender_company,sender_contact,sender_address,receiver_company,receiver_contact,receiver_address,shipping_service,created_by',
        },
      ),
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const searchParams = Route.useSearch();
  const shipments = Route.useLoaderData();

  return (
    <article className="grid grid-cols-12 gap-2.5">
      <section className="col-span-full">
        {/* Heading */}
        <h1 className="text-3xl font-medium border-b pb-4">Shipments</h1>
      </section>
      <section>{/* Key statistics */}</section>
      <section className="flex flex-row justify-end col-span-full">
        {/* Table actions */}
        <Button
          onClick={() =>
            navigate({
              search: (prev) => ({ ...prev, newShipment: true }),
            })
          }
          variant={'outline'}
        >
          Create Shipment
        </Button>
      </section>
      <section className="col-span-full">
        <DataTable columns={columns} data={shipments} />
      </section>
      <section>
        {/* Action dialogs */}
        {searchParams.newShipment && <NewShipmentDialog />}
        {searchParams.editShipment && <EditShipmentDialog />}
        {searchParams.deleteShipment && <DeleteShipmentDialog />}
      </section>
    </article>
  );
}
