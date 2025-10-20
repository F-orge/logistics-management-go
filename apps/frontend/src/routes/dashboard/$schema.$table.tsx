import { createFileRoute, notFound } from "@tanstack/react-router";
import { DbSchema } from "@packages/db";
import { z, type ZodObject } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import type { ColumnDef } from "@tanstack/react-table";

export const Route = createFileRoute("/dashboard/$schema/$table")({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      page: z.number().nonnegative().catch(1).default(1),
      perPage: z.number().nonnegative().max(100).catch(10).default(10),
      sort: z
        .record(z.string(), z.enum(["asc", "desc"]))
        .array()
        .optional(),
      any: z.uuid().array().optional(),
      filter: z
        .object({
          column: z.string(),
          operator: z.enum(["<", ">", "=", "!=", "like"]),
          value: z.any().refine((arg) => arg === undefined, {
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
      `/api/${context.params.schema}/${context.params.table}/`,
      {
        method: "GET",
      }
    );

    if (result.status === 404) throw notFound({ routeId: "/dashboard" });

    return {
      data: await result.json(),
      columns: columns as ColumnDef<any>[],
    };
  },
});

function RouteComponent() {
  const pathParams = Route.useParams();

  return (
    <div>
      Hello "/dashboard/{pathParams.schema}/{pathParams.table}"!
    </div>
  );
}
