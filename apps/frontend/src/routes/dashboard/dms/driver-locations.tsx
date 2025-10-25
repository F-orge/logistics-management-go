import { columns } from "@/components/tables/dms/driver_locations";
import {
  NewDriverLocationDialogForm,
  UpdateDriverLocationDialogForm,
} from "@/components/forms/dms/driver_locations";
import { execute, TableDriverLocationQuery } from "@packages/graphql/client";
import { Button, DataTable } from "@packages/ui";
import { createFileRoute } from "@tanstack/react-router";
import { PaginationState } from "@tanstack/react-table";
import { zodValidator } from "@tanstack/zod-adapter";
import React, { useEffect } from "react";
import z from "zod";

export const Route = createFileRoute("/dashboard/dms/driver-locations")({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      page: z.number().min(1).default(1).catch(1),
      perPage: z.number().min(10).default(10).catch(10),
      new: z.boolean().optional(),
      edit: z.boolean().optional(),
      delete: z.boolean().optional(),
      id: z.string().optional(),
    })
  ),
  beforeLoad: ({ search }) => ({ search }),
  loader: async ({ context }) => {
    const result = await execute("/api/graphql", TableDriverLocationQuery, {
      page: context.search.page,
      perPage: context.search.perPage,
    });

    return result.data?.dms?.driverLocations || [];
  },
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const data = Route.useLoaderData();

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: searchQuery.page,
    pageSize: searchQuery.perPage,
  });

  useEffect(() => {
    if (pagination.pageIndex != searchQuery.page) {
      navigate({ search: (prev) => ({ ...prev, page: pagination.pageIndex }) });
    }

    if (pagination.pageSize != searchQuery.perPage) {
      navigate({
        search: (prev) => ({ ...prev, perPage: pagination.pageSize }),
      });
    }
  }, [pagination]);

  return (
    <article className="grid grid-cols-12 gap-5">
      <section className="col-span-full flex justify-end">
        <Button
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, new: true }) })
          }
        >
          Create
        </Button>
      </section>
      <section className="col-span-full">
        <DataTable
          columns={columns}
          data={data}
          onPaginationChange={setPagination}
          paginationState={pagination}
        />
      </section>
      <section>
        <NewDriverLocationDialogForm />
        <UpdateDriverLocationDialogForm data={data as any} />
      </section>
    </article>
  );
}
