import { columns } from "@/components/tables/wms/inbound_shipments";
import {
  InboundShipmentStatus,
  execute,
  TableInboundShipmentQuery,
} from "@packages/graphql/client";
import { DataTable } from "@packages/ui";
import { createFileRoute } from "@tanstack/react-router";
import { PaginationState } from "@tanstack/react-table";
import { zodValidator } from "@tanstack/zod-adapter";
import React, { useEffect } from "react";
import z from "zod";
import EnumSelect from "@packages/ui/components/ui/enum-select";

export const Route = createFileRoute("/dashboard/wms/inbound-shipments")({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      page: z.number().min(1).default(1).catch(1),
      perPage: z.number().min(10).default(10).catch(10),
      status: z.enum(InboundShipmentStatus).optional(),
    })
  ),
  beforeLoad: ({ search }) => ({ search }),
  loader: async ({ context }) => {
    const result = await execute("/api/graphql", TableInboundShipmentQuery, {
      page: context.search.page,
      perPage: context.search.perPage,
      status: context.search.status,
    });

    return result.data?.wms?.inboundShipments || [];
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
      <section className="col-span-full flex flex-row items-center gap-2.5">
        <EnumSelect
          onValueChange={(v) =>
            navigate({
              search: (prev) => ({ ...prev, status: v as any }),
            })
          }
          options={Object.values(InboundShipmentStatus).map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder="Select status"
        />
      </section>
      <section className="col-span-full">
        <DataTable
          columns={columns}
          data={data}
          onPaginationChange={setPagination}
          paginationState={pagination}
        />
      </section>
    </article>
  );
}
