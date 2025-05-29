import { DataTable } from '@marahuyo/react-ui/data-table/data-table';
import { DataTableAdvancedToolbar } from '@marahuyo/react-ui/data-table/data-table-advanced-toolbar';
import { DataTableFilterList } from '@marahuyo/react-ui/data-table/data-table-filter-list';
import { DataTableSortList } from '@marahuyo/react-ui/data-table/data-table-sort-list';
import { useDataTable } from '@marahuyo/react-ui/hooks/use-data-table';
import { Button } from '@marahuyo/react-ui/ui/button';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Suspense } from 'react';
import { Collections } from '../../../../lib/pocketbase.gen';
import { listRecordsQuery } from '../../../queries';
import { type ExpandedInventoryItemsResponse, columns } from './-columns';
import DeleteInventoryItemForm from './-delete';
import EditInventoryItemForm from './-edit';
import NewInventoryItemForm from './-new';
import { searchQuerySchema } from './-schema';

export const Route = createFileRoute('/dashboard/inventory/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchQuerySchema),
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const inventoryItems = useQuery(
    listRecordsQuery<ExpandedInventoryItemsResponse>(
      Collections.InventoryItems,
      {
        page: searchQuery.inventoryItemsPage,
        perPage: searchQuery.inventoryItemsPerPage,
      },
      { expand: 'product,warehouse' },
    ),
  );

  const { table } = useDataTable({
    data: inventoryItems.data?.items || [],
    columns,
    pageCount: inventoryItems.data?.totalPages ?? 0,
    pageKey: 'inventoryItemsPage',
    perPageKey: 'inventoryItemsPerPage',
  });

  return (
    <div className="grid grid-cols-12 gap-5">
      <DataTable className="col-span-12" table={table}>
        <DataTableAdvancedToolbar table={table}>
          <DataTableFilterList table={table} />
          <DataTableSortList table={table} />
          <Button
            onClick={() =>
              navigate({
                search: (prev) => ({ ...prev, newInventoryItem: true }),
              })
            }
            size={'sm'}
          >
            Create Inventory Item
          </Button>
        </DataTableAdvancedToolbar>
      </DataTable>
      {searchQuery.newInventoryItem && <NewInventoryItemForm />}
      {searchQuery.editInventoryItem && <EditInventoryItemForm />}
      {searchQuery.deleteInventoryItem && <DeleteInventoryItemForm />}
    </div>
  );
}
