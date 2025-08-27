import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/kibo-ui/table/data-table";
import { pb } from "@/pocketbase";
import DeleteInvoiceDialog from "./-actions/delete";
import EditInvoiceDialog from "./-actions/edit";
import NewInvoiceDialog from "./-actions/new";
import LoadingPage from "./-loading";
import { columns } from "./-table";
import type {
  CrmCompaniesRecord,
  CrmInvoicesResponse,
} from "@/pocketbase/types";

export const Route = createFileRoute("/dashboard/crm/invoices/")({
  component: RouteComponent,
  pendingComponent: LoadingPage,
  validateSearch: zodValidator(
    z.object({
      page: z.number().nonnegative().default(1).catch(1),
      perPage: z.number().nonnegative().default(10).catch(10),
      newInvoice: z.boolean().optional(),
      editInvoice: z.boolean().optional(),
      deleteInvoice: z.boolean().optional(),
      id: z.string().optional(),
      sort: z.array(z.string()).default(["-created"]),
      filter: z.array(z.string()).optional(),
    }),
  ),
  beforeLoad: ({ search }) => ({ search }),
  preload: true,
  loader: ({ context }) =>
    pb
      .collection("crm_invoices")
      .getList<CrmInvoicesResponse<{ company: CrmCompaniesRecord }>>(
        context.search.page,
        context.search.perPage,
        {
          sort: context.search.sort.join(" "),
          filter: context.search.filter?.join(" "),
          expand: "company,contact",
        },
      ),
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const searchParams = Route.useSearch();

  const invoices = Route.useLoaderData();

  return (
    <article className="grid grid-cols-12 gap-2.5">
      <section className="col-span-full">
        {/* Heading */}
        <h1 className="text-3xl font-medium border-b pb-4">Invoices</h1>
      </section>
      <section>{/* Key statistics */}</section>
      <section className="flex flex-row justify-end col-span-full">
        {/* Table actions */}
        <Button
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, newInvoice: true }) })}
          variant={"outline"}
        >
          Create Invoice
        </Button>
      </section>
      <section className="col-span-full">
        <DataTable columns={columns} data={invoices} />
      </section>
      <section>
        {/* Action dialogs */}
        {searchParams.newInvoice && <NewInvoiceDialog />}
        {searchParams.editInvoice && <EditInvoiceDialog />}
        {searchParams.deleteInvoice && <DeleteInvoiceDialog />}
      </section>
    </article>
  );
}
