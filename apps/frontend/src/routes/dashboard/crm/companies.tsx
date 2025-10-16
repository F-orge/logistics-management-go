import { orpcMutationOption, orpcQueryOption } from "@/queries/interface";
import * as contract from "@packages/rpc/src/contracts/crm/companies";
import { generateColumn } from "@packages/ui/components/ui/data-table/helpers";
import { DataTable } from "@packages/ui/components/ui/data-table/index";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { PaginationState, SortingState } from "@tanstack/react-table";
import { zodValidator } from "@tanstack/zod-adapter";
import { useEffect, useState } from "react";
import {
  AutoFormDialog,
  DeleteRecordForm,
} from "@packages/ui/components/ui/autoform/dialog";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@packages/ui";

const columns = generateColumn(
  contract.PaginateCompanyContract["~orpc"].outputSchema?.unwrap()
);

export const Route = createFileRoute("/dashboard/crm/companies")({
  component: RouteComponent,
  validateSearch: zodValidator(
    contract.PaginateCompanyContract["~orpc"].inputSchema!.extend({
      new: z.boolean().optional(),
      edit: z.boolean().optional(),
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
          contextMenus={[
            {
              label: "Edit Company Information",
              onClick: (row) =>
                navigate({
                  search: (prev) => ({
                    ...prev,
                    edit: true,
                    id: row.original.id,
                  }),
                }),
            },
            {
              label: "Delete Company",
              variant: "destructive",
              onClick: (row) =>
                navigate({
                  search: (prev) => ({
                    ...prev,
                    delete: true,
                    id: row.original.id,
                  }),
                }),
            },
          ]}
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
        <AutoFormDialog
          schema={
            contract.UpdateCompanyContract["~orpc"].inputSchema!.shape.value
          }
          open={searchQuery.edit && !!searchQuery.id}
          onOpenChange={() =>
            navigate({
              search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
            })
          }
          title="Update Company"
          defaultValues={data.find((row) => row.id === searchQuery.id)}
          onSubmit={(value) =>
            updateMutation.mutateAsync(
              { id: searchQuery.id as string, value },
              {
                onSuccess: () => {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      edit: undefined,
                      id: undefined,
                    }),
                  });
                  toast.success("Company record has been updated");
                },
              }
            )
          }
        />
        <DeleteRecordForm
          recordId={searchQuery.id as string}
          open={searchQuery.delete}
          onOpenChange={() =>
            navigate({
              search: (prev) => ({ ...prev, delete: undefined, id: undefined }),
            })
          }
          title="Are you sure you want to delete this record?"
          description="Deleting this record is permanent and cannot be undone"
          onSubmit={async (id) =>
            deleteMutation.mutateAsync(id, {
              onSuccess: () => {
                navigate({
                  search: (prev) => ({
                    ...prev,
                    delete: undefined,
                    id: undefined,
                  }),
                });
                toast.success("A record has been deleted successfully");
              },
            })
          }
        />
      </section>
    </article>
  );
}
