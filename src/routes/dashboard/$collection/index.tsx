import { createFileRoute } from '@tanstack/react-router';
import { columns as routesColumn } from './-columns/routes';
import {
  paginationConfig as routesPaginationConfig,
  searchQuerySchema as routesSearchQuerySchema,
} from './-schemas/routes';
import { useQuery } from '@tanstack/react-query';
import { type JSX, useEffect, useMemo } from 'react';
import { listRecordsQuery } from '../../../queries';
import { useDataTable } from '@marahuyo/react-ui/hooks/use-data-table';
import { DataTable } from '@marahuyo/react-ui/data-table/data-table';
import { DataTableAdvancedToolbar } from '@marahuyo/react-ui/data-table/data-table-advanced-toolbar';
import { DataTableFilterList } from '@marahuyo/react-ui/data-table/data-table-filter-list';
import { DataTableSortList } from '@marahuyo/react-ui/data-table/data-table-sort-list';
import collections from './-collections';
import { zodValidator } from '@tanstack/zod-adapter';
import { searchQuerySchema } from './-schema';
import type { ColumnDef } from '@tanstack/react-table';
import type { RecordOptions } from 'pocketbase';

export const Route = createFileRoute('/dashboard/$collection/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchQuerySchema),
  loader: async (ctx) => {
    const {
      columns,
      options,
    }: { columns: ColumnDef<unknown>[]; options: RecordOptions } = await import(
      `./-columns/${ctx.params.collection}`
    );

    const NewComponent = (
      await import(`./-actions/${ctx.params.collection}/new`)
    ).default;

    const EditComponent = (
      await import(`./-actions/${ctx.params.collection}/edit`)
    ).default;

    const DeleteComponent = (
      await import(`./-actions/${ctx.params.collection}/delete`)
    ).default;

    return {
      columns,
      options,
      NewComponent,
      EditComponent,
      DeleteComponent,
    };
  },
});

function RouteComponent() {
  const params = Route.useParams();
  const searchQuery = Route.useSearch();

  const { columns, options, NewComponent, EditComponent, DeleteComponent } =
    Route.useLoaderData();

  const collectionResponse = useQuery(
    listRecordsQuery(
      params.collection,
      {
        page: searchQuery.page,
        perPage: searchQuery.perPage,
      },
      options,
    ),
  );

  const { table } = useDataTable({
    data: collectionResponse.data?.items || [],
    columns,
    pageCount: collectionResponse.data?.totalPages || 0,
  });

  return (
    <div className="grid grid-cols-12">
      <DataTable className="col-span-full" table={table}>
        <DataTableAdvancedToolbar table={table}>
          <DataTableFilterList table={table} />
          <DataTableSortList table={table} />
          <NewComponent />
          {searchQuery.edit && <EditComponent />}
          {searchQuery.delete && <DeleteComponent />}
        </DataTableAdvancedToolbar>
      </DataTable>
    </div>
  );
}
