import { columns } from "@/components/tables/tms/expenses";
import {
  Currency,
  ExpenseStatus,
  ExpenseType,
  execute,
  TableExpenseQuery,
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

export const Route = createFileRoute("/dashboard/tms/expenses")({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      page: z.number().min(1).default(1).catch(1),
      perPage: z.number().min(10).default(10).catch(10),
      search: z.string().optional().default(""),
      status: z.enum(ExpenseStatus).optional(),
      type: z.enum(ExpenseType).optional(),
      currency: z.enum(Currency).optional(),
    })
  ),
  beforeLoad: ({ search }) => ({ search }),
  loader: async ({ context }) => {
    const result = await execute("/api/graphql", TableExpenseQuery, {
      page: context.search.page,
      perPage: context.search.perPage,
      search: context.search.search,
      status: context.search.status,
      type: context.search.type,
      currency: context.search.currency,
    });

    return result.data?.tms?.expenses || [];
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
              search: (prev) => ({ ...prev, status: v as any }),
            })
          }
          options={Object.values(ExpenseStatus).map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder="Select status"
        />
        <EnumSelect
          onValueChange={(v) =>
            navigate({
              search: (prev) => ({ ...prev, type: v as any }),
            })
          }
          options={Object.values(ExpenseType).map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder="Select type"
        />
        <EnumSelect
          onValueChange={(v) =>
            navigate({
              search: (prev) => ({ ...prev, currency: v as any }),
            })
          }
          options={Object.values(Currency).map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder="Select currency"
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
