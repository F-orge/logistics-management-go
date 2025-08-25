import { createFileRoute } from "@tanstack/react-router";
import LoadingPage from "./-loading";
import { pb } from "@/pocketbase";
import { columns } from "./-table";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import DataTable from "@/components/ui/kibo-ui/table/data-table";
import NewLeadsDialog from "./-actions/new";

export const Route = createFileRoute("/dashboard/crm/leads/")({
  component: RouteComponent,
  pendingComponent: LoadingPage,
  validateSearch: zodValidator(
    z.object({
      page: z.number().nonnegative().default(1).catch(1),
      perPage: z.number().nonnegative().default(10).catch(10),
      newLead: z.boolean().optional(),
    }),
  ),
  beforeLoad: ({ search }) => ({ search }),
  loader: ({ context }) =>
    pb.collection("crm_leads").getList(
      context.search.page,
      context.search.perPage,
      {
        sort: "-created",
      },
    ),
});

function RouteComponent() {
  const leads = Route.useLoaderData();

  return (
    <article className="grid grid-cols-12">
      <section>
        {/* Heading */}
        <h1 className="text-3xl font-medium border-b pb-4">Leads</h1>
      </section>
      <section>
        {/* Key statistics */}
      </section>
      <section>
        {/* Table actions */}
      </section>
      <section className="col-span-full">
        <DataTable columns={columns} data={leads} />
      </section>
      <section>
        {/* Action dialogs */}
        <NewLeadsDialog />
      </section>
    </article>
  );
}
