import { createFileRoute, notFound } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { zodValidator } from "@tanstack/zod-adapter";
import { EditIcon } from "lucide-react";
import { ClientResponseError, RecordListOptions } from "pocketbase";
import React from "react";
import z from "zod";
import QrDialog from "@/components/dialogs/qr";
import { ContextMenuItem, DataTable } from "@/components/ui/data-table";
import { GlobalAction } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/$schema/$collection")({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      page: z.number().min(1).nonnegative().default(1).catch(1),
      perPage: z.number().min(10).nonnegative().max(100).catch(10),
      filter: z.string().optional(),
      sort: z.string().optional(),
      action: z.string().optional(),
      id: z.string().optional(),
    })
  ),
  beforeLoad: ({ search }) => ({ search }),
  loader: async ({ context, params }) => {
    try {
      const {
        columns,
        options,
        actions,
      }: {
        columns: ColumnDef<any>[];
        options: RecordListOptions;
        actions: ContextMenuItem<any>[];
      } = await import(
        `../../components/tables/${params.schema}/${params.collection}.tsx`
      );

      const { default: Actions }: { default: React.FC<any> } = await import(
        `../../components/actions/${params.schema}/${params.collection}`
      );

      const {
        default: tableActions,
      }: {
        default: Array<GlobalAction<"/dashboard/$schema/$collection">>;
      } = await import(`../../components/actions/${params.schema}/global`);

      const { default: globalActions } = await import(
        "@/components/actions/system"
      );

      const {
        default: ControlSection,
      }: {
        default: React.FC<{
          globalAction: GlobalAction<"/dashboard/$schema/$collection">[];
        }>;
      } = await import(
        `../../components/controls/${params.schema}/${params.collection}.tsx`
      );

      const collection = `${params.schema}-${params.collection}`.replaceAll(
        "-",
        "_"
      );

      const result = await context.pocketbase
        .collection(collection)
        .getList(context.search.page, context.search.perPage, {
          ...options,
          filter: context.search.filter,
          sort: context.search.sort,
        });

      return {
        data: result,
        columns,
        Actions,
        actions,
        tableActions,
        globalActions,
        ControlSection,
      };
    } catch (error) {
      if (error instanceof ClientResponseError) {
        if (error.status === 404) {
          throw notFound();
        }
      }
      throw error;
    }
  },
});

function RouteComponent() {
  const {
    data,
    columns,
    Actions,
    ControlSection,
    tableActions,
    globalActions,
    actions,
  } = Route.useLoaderData();
  const navigate = Route.useNavigate();

  return (
    <article className="grid grid-cols-12 gap-5">
      <section>{/* analytics section */}</section>
      {ControlSection && (
        <ControlSection globalAction={[...globalActions, ...tableActions]} />
      )}
      <section className="col-span-full">
        <DataTable
          columns={columns}
          data={data}
          onPageChange={(page) =>
            navigate({ search: { page, perPage: data.perPage } })
          }
          navigate={navigate}
          contextItems={actions}
        />
      </section>
      <section>
        <Actions />
      </section>
      <section>
        <QrDialog />
      </section>
    </article>
  );
}
