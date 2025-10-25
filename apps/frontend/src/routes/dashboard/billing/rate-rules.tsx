import { columns } from "@/components/tables/billing/rate_rules";
import {
  PricingModel,
  execute,
  TableRateRuleQuery,
} from "@packages/graphql/client";
import {
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

export const Route = createFileRoute("/dashboard/billing/rate-rules")({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      page: z.number().min(1).default(1).catch(1),
      perPage: z.number().min(10).default(10).catch(10),
      search: z.string().optional().default(""),
      pricingModel: z.enum(PricingModel).optional(),
    })
  ),
  beforeLoad: ({ search }) => ({ search }),
  loader: async ({ context }) => {
    const result = await execute("/api/graphql", TableRateRuleQuery, {
      page: context.search.page,
      perPage: context.search.perPage,
      search: context.search.search,
      pricingModel: context.search.pricingModel,
    });

    return result.data?.billing?.rateRules || [];
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
        <EnumSelect
          onValueChange={(v) =>
            navigate({
              search: (prev) => ({ ...prev, pricingModel: v as any }),
            })
          }
          options={Object.values(PricingModel).map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder="Select pricing model"
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
