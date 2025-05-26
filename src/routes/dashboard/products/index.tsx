import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { searchQuerySchema } from './-schema';
import { listRecordsQuery } from '../../../queries';
import { Collections } from '../../../../lib/pocketbase.gen';
import { useQuery } from '@tanstack/react-query';
import { columns, type ExpandedProductsResponse } from './-columns';
import { useDataTable } from '@marahuyo/react-ui/hooks/use-data-table';
import { DataTable } from '@marahuyo/react-ui/data-table/data-table';
import { DataTableAdvancedToolbar } from '@marahuyo/react-ui/data-table/data-table-advanced-toolbar';
import { DataTableFilterList } from '@marahuyo/react-ui/data-table/data-table-filter-list';
import { DataTableSortList } from '@marahuyo/react-ui/data-table/data-table-sort-list';
import { Button } from '@marahuyo/react-ui/ui/button';
import NewProductForm from './-new';
import EditProductForm from './-edit';
import DeleteProductForm from './-delete';

export const Route = createFileRoute('/dashboard/products/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchQuerySchema),
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const products = useQuery(
    listRecordsQuery<ExpandedProductsResponse>(
      Collections.Products,
      {
        page: searchQuery.productsPage,
        perPage: searchQuery.productsPerPage,
      },
      { expand: 'supplier' },
    ),
  );

  const { table } = useDataTable({
    data: products.data?.items || [],
    columns,
    pageCount: products.data?.totalPages || 0,
    pageKey: 'productsPage',
    perPageKey: 'productsPerPage',
  });

  return (
    <div>
      <DataTable table={table}>
        <DataTableAdvancedToolbar table={table}>
          <DataTableFilterList table={table} />
          <DataTableSortList table={table} />
          <Button
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, newProduct: true }) })
            }
            size={'sm'}
          >
            Create Product
          </Button>
        </DataTableAdvancedToolbar>
      </DataTable>
      {searchQuery.newProduct && <NewProductForm />}
      {searchQuery.editProduct && <EditProductForm />}
      {searchQuery.deleteProduct && <DeleteProductForm />}
    </div>
  );
}
