import { DataTable } from '@marahuyo/react-ui/data-table/data-table';
import { DataTableAdvancedToolbar } from '@marahuyo/react-ui/data-table/data-table-advanced-toolbar';
import { DataTableFilterList } from '@marahuyo/react-ui/data-table/data-table-filter-list';
import { DataTableSortList } from '@marahuyo/react-ui/data-table/data-table-sort-list';
import { useDataTable } from '@marahuyo/react-ui/hooks/use-data-table';
import { Button } from '@marahuyo/react-ui/ui/button';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Collections } from '../../../../lib/pocketbase.gen';
import { listRecordsQuery } from '../../../queries';
import { type ExpandedWarehouseResponse, columns } from './-columns';
import DeleteWarehouseForm from './-delete';
import EditWarehouseForm from './-edit';
import NewWarehouseForm from './-new';
import { searchQuerySchema } from './-schema';

export const Route = createFileRoute('/dashboard/warehouses/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchQuerySchema),
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

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
    <div className="grid grid-cols-12 gap-5">
      <DataTable className="col-span-12" table={table}>
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
