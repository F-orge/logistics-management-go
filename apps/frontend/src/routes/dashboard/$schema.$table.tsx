import { createFileRoute, notFound } from "@tanstack/react-router";
import { DbSchema } from "@packages/db";
import { z, type ZodObject } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import type {
  ColumnDef,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { DataTable, Input } from "@packages/ui";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dashboard/$schema/$table")({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      page: z.number().nonnegative().min(1).catch(1).default(1),
      perPage: z.number().nonnegative().max(50).catch(10).default(10),
      sort: z
        .record(z.string(), z.enum(["asc", "desc"]))
        .array()
        .optional(),
      any: z.uuid().array().optional(),
      filter: z
        .object({
          column: z.string(),
          operator: z.enum(["<", ">", "=", "!=", "like"]),
          value: z.any().refine((arg) => arg !== undefined, {
            message: "value cannot be undefined",
          }),
        })
        .array()
        .optional(),
      from: z.date().optional(),
      to: z.date().optional(),
      id: z.string().optional(),
      new: z.boolean().optional(),
      edit: z.boolean().optional(),
      delete: z.boolean().optional(),
    })
  ),
  beforeLoad: async ({ params, search }) => {
    const tableDef = (
      DbSchema.shape[params.schema as keyof typeof DbSchema.shape] as ZodObject
    ).shape[params.table] as ZodObject;

    let tableColDef;

    try {
      tableColDef = await import(
        `../../components/tables/${params.schema}/${params.table}`
      );
    } catch (e) {
      console.error(e);
    }

    return { params, tableDef, search, tableColDef };
  },

  loader: async ({ context }) => {
    if (!context.tableDef) throw notFound({ routeId: "/dashboard" });
    if (!context.tableColDef) throw notFound({ routeId: "/dashboard" });

    const { columns } = context.tableColDef;

    const result = await fetch(
      `/api/${context.params.schema}/${
        context.params.table
      }/?${new URLSearchParams(context.search as any).toString()}`,
      {
        method: "GET",
      }
    );

    if (result.status === 404) throw notFound({ routeId: "/dashboard" });

    return {
      data: (await result.json()) as any[],
      columns: columns as ColumnDef<any>[],
      tableDef: context.tableDef,
    };
  },
});

function RouteComponent() {
  const pathParams = Route.useParams();
  const navigate = Route.useNavigate();
  const searchQuery = Route.useSearch();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: searchQuery.page,
    pageSize: searchQuery.perPage,
  });

  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);

  useEffect(() => {
    if (
      searchQuery.page !== pagination.pageIndex ||
      searchQuery.perPage !== pagination.pageSize
    ) {
      navigate({
        search: (prev) => ({
          ...prev,
          page: pagination.pageIndex,
          perPage: pagination.pageSize,
        }),
      });
    }
  }, [pagination]);

  const { columns, data, tableDef } = Route.useLoaderData();

  return (
    <article className="grid grid-cols-12 gap-5">
      <section className="border-b col-span-full pb-2">
        <h1 className="text-2xl font-bold">{pathParams.table}</h1>
      </section>
      <section className="col-span-full flex justify-between">
        <Input placeholder="Search" className="w-1/4" />
      </section>
      <section className="col-span-full">
        <DataTable
          columns={columns}
          data={data}
          paginationState={pagination}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          sortingState={sorting}
        />
      </section>
    </article>
  );
}
