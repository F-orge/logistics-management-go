import { columns } from "@/components/tables/dms/delivery_routes";
import {
  NewDeliveryRouteDialogForm,
  UpdateDeliveryRouteDialogForm,
} from "@/components/forms/dms/delivery_routes";
import {
  DeliveryRouteStatus,
  execute,
  TableDeliveryRoute,
} from "@packages/graphql/client";
import {
  Button,
  DataTable,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@packages/ui";
import { createFileRoute } from "@tanstack/react-router";
import { PaginationState } from "@tanstack/react-table";
import { zodValidator } from "@tanstack/zod-adapter";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import z from "zod";
import EnumSelect from "@packages/ui/components/ui/enum-select";

export const Route = createFileRoute("/dashboard/dms/delivery-routes")({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      page: z.number().min(1).default(1).catch(1),
      perPage: z.number().min(10).default(10).catch(10),
      search: z.string().optional().default(""),
      status: z.enum(DeliveryRouteStatus).optional(),
      new: z.boolean().optional(),
      edit: z.boolean().optional(),
      delete: z.boolean().optional(),
      id: z.string().optional(),
    })
  ),
  beforeLoad: ({ search }) => ({ search }),
  loader: async ({ context }) => {
    const result = await execute("/api/graphql", TableDeliveryRoute, {
      page: context.search.page,
      perPage: context.search.perPage,
      search: context.search.search,
      status: context.search.status,
    });

    return result.data?.dms?.deliveryRoutes || [];
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
      <section className="col-span-full flex justify-between items-center gap-2.5">
        <InputGroup className="w-1/4">
          <InputGroupInput
            onBlur={(e) =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  search: e.target.value.trim() || "",
                }),
              })
            }
            placeholder="Search..."
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {data.length} Results
          </InputGroupAddon>
        </InputGroup>
        <div className="flex gap-2.5">
          <EnumSelect
            onValueChange={(v) =>
              navigate({
                search: (prev) => ({ ...prev, status: v as any }),
              })
            }
            options={Object.values(DeliveryRouteStatus).map((item) => ({
              label: item,
              value: item,
            }))}
            placeholder="Select status"
          />
          <Button
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, new: true }) })
            }
          >
            Create
          </Button>
        </div>
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
        <NewDeliveryRouteDialogForm />
        <UpdateDeliveryRouteDialogForm data={data} />
      </section>
    </article>
  );
}
