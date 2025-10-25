import { columns } from "@/components/tables/crm/invoices";
import {
  NewInvoiceDialogForm,
  UpdateInvoiceDialogForm,
} from "@/components/forms/crm/invoices";
import {
  CrmInvoicePaymentMethod,
  InvoiceStatus,
  execute,
  TableInvoiceQuery,
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

export const Route = createFileRoute("/dashboard/crm/invoices")({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      page: z.number().min(1).default(1).catch(1),
      perPage: z.number().min(10).default(10).catch(10),
      search: z.string().optional().default(""),
      status: z.enum(InvoiceStatus).optional(),
      paymentMethod: z.enum(CrmInvoicePaymentMethod).optional(),
      new: z.boolean().optional(),
      edit: z.boolean().optional(),
      delete: z.boolean().optional(),
      id: z.string().optional(),
    })
  ),
  beforeLoad: ({ search }) => ({ search }),
  loader: async ({ context }) => {
    const result = await execute("/api/graphql", TableInvoiceQuery, {
      page: context.search.page,
      perPage: context.search.perPage,
      search: context.search.search,
      status: context.search.status,
      paymentMethod: context.search.paymentMethod,
    });

    return result.data?.crm?.invoices || [];
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
      <section className="col-span-full flex justify-between">
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
        <Button
          onClick={() =>
            navigate({ search: (prev) => ({ ...prev, new: true }) })
          }
        >
          Create
        </Button>
      </section>
      <section className="col-span-full flex flex-row items-center gap-2.5">
        <EnumSelect
          onValueChange={(v) =>
            navigate({
              search: (prev) => ({ ...prev, status: v as any }),
            })
          }
          options={Object.values(InvoiceStatus).map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder="Select status"
        />
        <EnumSelect
          onValueChange={(v) =>
            navigate({
              search: (prev) => ({ ...prev, paymentMethod: v as any }),
            })
          }
          options={Object.values(CrmInvoicePaymentMethod).map((item) => ({
            label: item,
            value: item,
          }))}
          placeholder="Select payment method"
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
      <section>
        <NewInvoiceDialogForm />
        <UpdateInvoiceDialogForm data={data} />
      </section>
    </article>
  );
}
