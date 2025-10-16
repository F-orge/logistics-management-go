import { orpcMutationOption, orpcQueryOption } from "@/queries/interface";
import * as contract from "@packages/rpc/src/contracts/crm/companies";
import { generateColumn } from "@packages/ui/components/ui/data-table/helpers";
import { DataTable } from "@packages/ui/components/ui/data-table/index";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { PaginationState, SortingState } from "@tanstack/react-table";
import { zodValidator } from "@tanstack/zod-adapter";
import { useEffect, useState } from "react";
import { AutoFormDialog } from "@packages/ui/components/ui/autoform/dialog";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@packages/ui";

const columns = generateColumn(
  contract.PaginateCompanyContract["~orpc"].outputSchema?.unwrap()
);

export const Route = createFileRoute("/dashboard/crm/companies/")({
  component: RouteComponent,
  validateSearch: zodValidator(
    contract.PaginateCompanyContract["~orpc"].inputSchema!.extend({
      new: z.boolean().optional(),
      delete: z.boolean().optional(),
      id: z.string().optional(),
    })
  ),
  beforeLoad: ({ search }) => ({ search }),
  loader: async ({ context }) => {
    return context.queryClient.fetchQuery(
      orpcQueryOption("crm", "PaginateCompany", context.search)
    );
  },
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: searchQuery.perPage,
    pageIndex: searchQuery.page,
  });

  const [sort, setSort] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);

  const createMutation = useMutation(
    orpcMutationOption("crm", "InsertCompany")
  );

  const updateMutation = useMutation(
    orpcMutationOption("crm", "UpdateCompany")
  );

  const deleteMutation = useMutation(
    orpcMutationOption("crm", "RemoveCompany")
  );

  useEffect(() => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: pagination.pageIndex,
        perPage: pagination.pageSize,
      }),
    });
  }, [pagination]);

  useEffect(() => {
    const newSort = sort.map((field) => ({
      column: field.id,
      order: field.desc ? "desc" : "asc",
    }));
    navigate({ search: (prev) => ({ ...prev, sort: newSort as any }) });
  }, [sort]);

  const data = Route.useLoaderData();

  return (
    <article className="grid grid-cols-12 gap-2.5">
      <section className="col-span-full border-b pb-2">
        <h1 className="text-2xl font-bold">Companies</h1>
      </section>
      <section className="col-span-full flex justify-end">
        <Button
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, new: true }) })
          }
          variant={"outline"}
        >
          New
        </Button>
      </section>
      <section className="col-span-full">
        <DataTable
          schema={contract.PaginateCompanyContract[
            "~orpc"
          ].outputSchema?.unwrap()}
          columns={columns}
          data={data}
          onSortingChange={setSort}
          sortingState={sort}
          onPaginationChange={setPagination}
          paginationState={pagination}
        />
      </section>
      <section>
        <AutoFormDialog
          schema={contract.InsertCompanyContract["~orpc"].inputSchema!}
          open={searchQuery.new}
          onOpenChange={() =>
            navigate({ search: (prev) => ({ ...prev, new: undefined }) })
          }
          title="New Company"
          onSubmit={(value) =>
            createMutation.mutateAsync(value, {
              onSuccess: () => {
                navigate({ search: (prev) => ({ ...prev, new: undefined }) });
                toast.success("New company has been created");
              },
            })
          }
        />
      </section>
    </article>
  );
}
