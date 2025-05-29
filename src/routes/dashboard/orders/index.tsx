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
import { type ExpandedOrdersResponse, columns } from './-columns';
import DeleteOrderForm from './-delete';
import EditOrderForm from './-edit';
import NewOrderForm from './-new';
import { searchQuerySchema } from './-schema';

export const Route = createFileRoute('/dashboard/orders/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchQuerySchema),
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const orders = useQuery(
    listRecordsQuery<ExpandedOrdersResponse>(
      Collections.Orders,
      {
        page: searchQuery.ordersPage,
        perPage: searchQuery.ordersPerPage,
      },
      { expand: 'customer,createdBy,assignedWarehouse' },
    ),
  );

  const { table } = useDataTable({
    data: orders.data?.items || [],
    columns,
    pageCount: orders.data?.totalPages || 0,
    pageKey: 'ordersPage',
    perPageKey: 'ordersPerPage',
  });

  return (
    <div className="grid grid-cols-12">
      <DataTable className="col-span-12" table={table}>
        <DataTableAdvancedToolbar table={table}>
          <DataTableFilterList table={table} />
          <DataTableSortList table={table} />
          <Button
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, newOrder: true }) })
            }
            size={'sm'}
          >
            Create Order
          </Button>
        </DataTableAdvancedToolbar>
      </DataTable>
      {searchQuery.newOrder && <NewOrderForm />}
      {searchQuery.editOrder && <EditOrderForm />}
      {searchQuery.deleteOrder && <DeleteOrderForm />}
    </div>
  );
}
