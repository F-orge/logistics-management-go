import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/kibo-ui/table/data-table";
import { pb } from "@/pocketbase";
import DeleteInteractionDialog from "./-actions/delete";
import EditInteractionDialog from "./-actions/edit";
import NewInteractionDialog from "./-actions/new";
import LoadingPage from "./-loading";
import { columns } from "./-table";
import type {
  CrmContactsRecord,
  CrmInteractionsResponse,
  CrmOpportunitiesRecord,
} from "@/pocketbase/types";

export const Route = createFileRoute("/dashboard/crm/interactions/")({
  component: RouteComponent,
  pendingComponent: LoadingPage,
  validateSearch: zodValidator(
    z.object({
      page: z.number().nonnegative().default(1).catch(1),
      perPage: z.number().nonnegative().default(10).catch(10),
      newInteraction: z.boolean().optional(),
      editInteraction: z.boolean().optional(),
      deleteInteraction: z.boolean().optional(),
      id: z.string().optional(),
      sort: z.array(z.string()).default(["-created"]),
      filter: z.array(z.string()).optional(),
    }),
  ),
  beforeLoad: ({ search }) => ({ search }),
  preload: true,
  loader: ({ context }) =>
    pb
      .collection("crm_interactions")
      .getList<
        CrmInteractionsResponse<
          { contact: CrmContactsRecord; opportunity: CrmOpportunitiesRecord }
        >
      >(context.search.page, context.search.perPage, {
        sort: context.search.sort.join(" "),
        filter: context.search.filter?.join(" "),
        expand: "contact,opportunity",
      }),
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const searchParams = Route.useSearch();

  const interactions = Route.useLoaderData();

  return (
    <article className="grid grid-cols-12 gap-2.5">
      <section className="col-span-full">
        {/* Heading */}
        <h1 className="text-3xl font-medium border-b pb-4">Interactions</h1>
      </section>
      <section>{/* Key statistics */}</section>
      <section className="flex flex-row justify-end col-span-full">
        {/* Table actions */}
        <Button
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, newInteraction: true }) })}
          variant={"outline"}
        >
          Create Interaction
        </Button>
      </section>
      <section className="col-span-full">
        <DataTable columns={columns} data={interactions} />
      </section>
      <section>
        {/* Action dialogs */}
        {searchParams.newInteraction && <NewInteractionDialog />}
        {searchParams.editInteraction && <EditInteractionDialog />}
        {searchParams.deleteInteraction && <DeleteInteractionDialog />}
      </section>
    </article>
  );
}
