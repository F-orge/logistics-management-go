import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { searchQuerySchema } from './-schema';
import { useQuery } from '@tanstack/react-query';
import { listRecordsQuery } from '../../../queries';
import { Collections } from '../../../../lib/pocketbase.gen';
import { useDataTable } from '@marahuyo/react-ui/hooks/use-data-table';
import { columns, type ExpandedWarehouseResponse } from './-columns';
import { DataTable } from '@marahuyo/react-ui/data-table/data-table';
import { DataTableAdvancedToolbar } from '@marahuyo/react-ui/data-table/data-table-advanced-toolbar';
import { DataTableFilterList } from '@marahuyo/react-ui/data-table/data-table-filter-list';
import { DataTableSortList } from '@marahuyo/react-ui/data-table/data-table-sort-list';
import { Button } from '@marahuyo/react-ui/ui/button';
import NewWarehouseForm from './-new';
import EditWarehouseForm from './-edit';
import DeleteWarehouseForm from './-delete';

export const Route = createFileRoute('/dashboard/warehouses/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchQuerySchema),
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const warehouses = useQuery(
    listRecordsQuery<ExpandedWarehouseResponse>(
      Collections.Warehouses,
      {
        page: searchQuery.warehousesPage,
        perPage: searchQuery.warehousesPerPage,
      },
      { expand: 'manager' },
    ),
  );

  const { table } = useDataTable({
    data: warehouses.data?.items || [],
    columns,
    pageCount: warehouses.data?.totalPages || 0,
  });

  return (
    <div>
      <DataTable table={table}>
        <DataTableAdvancedToolbar table={table}>
          <DataTableFilterList table={table} />
          <DataTableSortList table={table} />
          <Button
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, newWarehouse: true }) })
            }
            size={'sm'}
          >
            Create Warehouse
          </Button>
        </DataTableAdvancedToolbar>
      </DataTable>
      {searchQuery.newWarehouse && <NewWarehouseForm />}
      {searchQuery.editWarehouse && <EditWarehouseForm />}
      {searchQuery.deleteWarehouse && <DeleteWarehouseForm />}
    </div>
  );
}
