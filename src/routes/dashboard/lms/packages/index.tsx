import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/kibo-ui/table/data-table";
import { pb } from "@/pocketbase";
import DeletePackageDialog from "./-actions/delete";
import EditPackageDialog from "./-actions/edit";
import NewPackageDialog from "./-actions/new";
import LoadingPage from "./-loading";
import { columns, type PackageWithExpands } from "./-table";

export const Route = createFileRoute("/dashboard/lms/packages/")({
  component: RouteComponent,
  pendingComponent: LoadingPage,
  validateSearch: zodValidator(
    z.object({
      page: z.number().nonnegative().default(1).catch(1),
      perPage: z.number().nonnegative().default(10).catch(10),
      newPackage: z.boolean().optional(),
      editPackage: z.boolean().optional(),
      deletePackage: z.boolean().optional(),
      id: z.string().optional(),
      sort: z.array(z.string()).default(["-created"]),
      filter: z.array(z.string()).optional(),
    }),
  ),
  beforeLoad: ({ search }) => ({ search }),
  preload: true,
  loader: ({ context }) =>
    pb
      .collection("lms_packages")
      .getList<PackageWithExpands>(
        context.search.page,
        context.search.perPage,
        {
          sort: context.search.sort.join(" "),
          filter: context.search.filter?.join(" "),
          expand: "shipment",
        },
      ),
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const searchParams = Route.useSearch();
  const packages = Route.useLoaderData();

  return (
    <article className="grid grid-cols-12 gap-2.5">
      <section className="col-span-full">
        {/* Heading */}
        <h1 className="text-3xl font-medium border-b pb-4">Packages</h1>
      </section>
      <section>{/* Key statistics */}</section>
      <section className="flex flex-row justify-end col-span-full">
        {/* Table actions */}
        <Button
          onClick={() =>
            navigate({
              search: (prev) => ({ ...prev, newPackage: true }),
            })}
          variant={"outline"}
        >
          Create Package
        </Button>
      </section>
      <section className="col-span-full">
        <DataTable columns={columns} data={packages} />
      </section>
      <section>
        {/* Action dialogs */}
        {searchParams.newPackage && <NewPackageDialog />}
        {searchParams.editPackage && <EditPackageDialog />}
        {searchParams.deletePackage && <DeletePackageDialog />}
      </section>
    </article>
  );
}
