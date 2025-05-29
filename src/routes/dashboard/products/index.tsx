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
import { type ExpandedProductsResponse, columns } from './-columns';
import DeleteProductForm from './-delete';
import EditProductForm from './-edit';
import NewProductForm from './-new';
import { searchQuerySchema } from './-schema';

export const Route = createFileRoute('/dashboard/products/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchQuerySchema),
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

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
    <div className="grid grid-cols-12">
      <DataTable className="col-span-12" table={table}>
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
