import { orpcMutationOption, orpcQueryOption } from "@/queries/interface";
import * as contract from "@packages/rpc/src/contracts/crm/companies";
import type {
  ORPCServerInputs,
  ORPCServerOutputs,
} from "@packages/rpc/src/index";
import { generateColumn } from "@packages/ui/components/ui/data-table/helpers";
import { DataTable } from "@packages/ui/components/ui/data-table/index";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { PaginationState, SortingState } from "@tanstack/react-table";
import { zodValidator } from "@tanstack/zod-adapter";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const columns = generateColumn(
  contract.PaginateCompanyContract["~orpc"].outputSchema?.unwrap()
);

export const Route = createFileRoute("/dashboard/crm/companies/")({
  component: RouteComponent,
  validateSearch: zodValidator(
    contract.PaginateCompanyContract["~orpc"].inputSchema!
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
  const { orpcClient, queryClient } = Route.useRouteContext();

  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: searchQuery.perPage,
    pageIndex: searchQuery.page,
  });
  const [sort, setSort] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);

  const updateMutation = useMutation(
    orpcMutationOption("crm", "UpdateCompany")
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
    <article className="grid grid-cols-12">
      <section className="col-span-full">
        <DataTable
          updateData={async (dataId, col, value) =>
            await updateMutation.mutateAsync({
              id: dataId,
              value: { [col]: value },
            })
          }
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
    </article>
  );
}
