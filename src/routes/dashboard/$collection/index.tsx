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

export const Route = createFileRoute('/dashboard/$collection/')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const searchQuery = Route.useSearch() as Record<string, unknown>;
  const navigate = Route.useNavigate();

  const collectionMetadata = useMemo(
    () =>
      collections.find((collection) => collection.name === params.collection),
    [params],
  );

  useEffect(() => {
    navigate({
      search: (prev) => ({
        ...collectionMetadata?.searchQueryConfig.parse({}),
        ...prev,
      }),
    });
  }, [navigate, collectionMetadata]);

  const collectionResponse = useQuery(
    listRecordsQuery(
      collectionMetadata?.name || '',
      {
        page: searchQuery[
          collectionMetadata?.paginationConfig.pageKey || ''
        ] as number,
        perPage: searchQuery[
          collectionMetadata?.paginationConfig.perPageKey || ''
        ] as number,
      },
      collectionMetadata?.recordOption,
    ),
  );

  const { table } = useDataTable({
    data: collectionResponse.data?.items || [],
    columns: collectionMetadata?.columns || [],
    pageCount: collectionResponse.data?.totalPages || 0,
    pageKey: collectionMetadata?.paginationConfig.pageKey || '',
    perPageKey: collectionMetadata?.paginationConfig.perPageKey || '',
  });

  return (
    <div className="grid grid-cols-12">
      <DataTable className="col-span-full" table={table}>
        <DataTableAdvancedToolbar table={table}>
          <DataTableFilterList table={table} />
          <DataTableSortList table={table} />
          {collectionMetadata?.toolbarComponents.map((el) => el())}
        </DataTableAdvancedToolbar>
      </DataTable>
    </div>
  );
}
