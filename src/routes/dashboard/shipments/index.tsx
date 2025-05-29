import { DataTable } from '@marahuyo/react-ui/data-table/data-table';
import { DataTableAdvancedToolbar } from '@marahuyo/react-ui/data-table/data-table-advanced-toolbar';
import { DataTableFilterList } from '@marahuyo/react-ui/data-table/data-table-filter-list';
import { DataTableSortList } from '@marahuyo/react-ui/data-table/data-table-sort-list';
import { useDataTable } from '@marahuyo/react-ui/hooks/use-data-table';
import { Button } from '@marahuyo/react-ui/ui/button';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Collections } from '../../../../lib/pocketbase.gen';
import { listRecordsQuery } from '../../../queries';
import { type ExpandedShipmentsResponse, columns } from './-columns';
import DeleteShipmentForm from './-delete';
import EditShipmentForm from './-edit';
import NewShipmentForm from './-new';
import { searchQuerySchema } from './-schema';

export const Route = createFileRoute('/dashboard/shipments/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchQuerySchema),
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const shipments = useQuery(
    listRecordsQuery<ExpandedShipmentsResponse>(
      Collections.Shipments,
      {
        page: searchQuery.shipmentsPage,
        perPage: searchQuery.shipmentsPerPage,
      },
      { expand: 'orderRef,carrier,driver,departmentAssigned' },
    ),
  );

  const { table } = useDataTable({
    data: shipments.data?.items || [],
    columns,
    pageCount: shipments.data?.totalPages || 0,
    pageKey: 'shipmentsPage',
    perPageKey: 'shipmentsPerPage',
  });

  return (
    <div className="grid grid-cols-12">
      <DataTable className="col-span-12" table={table}>
        <DataTableAdvancedToolbar table={table}>
          <DataTableFilterList table={table} />
          <DataTableSortList table={table} />
          <Button
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, newShipment: true }) })
            }
            size={'sm'}
          >
            Create Shipment
          </Button>
        </DataTableAdvancedToolbar>
      </DataTable>
      {searchQuery.newShipment && <NewShipmentForm />}
      {searchQuery.editShipment && <EditShipmentForm />}
      {searchQuery.deleteShipment && <DeleteShipmentForm />}
    </div>
  );
}
