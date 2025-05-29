import { DataTable } from '@marahuyo/react-ui/data-table/data-table';
import { DataTableAdvancedToolbar } from '@marahuyo/react-ui/data-table/data-table-advanced-toolbar';
import { DataTableFilterList } from '@marahuyo/react-ui/data-table/data-table-filter-list';
import { DataTableSortList } from '@marahuyo/react-ui/data-table/data-table-sort-list';
import { useDataTable } from '@marahuyo/react-ui/hooks/use-data-table';
import { Button } from '@marahuyo/react-ui/ui/button';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import {
  Collections,
  type CompaniesResponse,
  type UsersRecord,
} from '../../../../lib/pocketbase.gen';
import { listRecordsQuery } from '../../../queries';
import { columns } from './-columns';
import DeleteCompanyForm from './-delete';
import EditCompanyForm from './-edit';
import NewCompanyForm from './-new';
import { searchQuerySchema } from './-query';

export const Route = createFileRoute('/dashboard/companies/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchQuerySchema),
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

  const companies = useQuery(
    listRecordsQuery<CompaniesResponse<{ primaryContactPerson?: UsersRecord }>>(
      Collections.Companies,
      {
        page: searchQuery.companiesPage,
        perPage: searchQuery.companiesPerPage,
      },
      { expand: 'primaryContactPerson' },
    ),
  );

  const { table } = useDataTable({
    data: companies.data?.items || [],
    columns,
    pageCount: companies.data?.totalPages || 0,
    perPageKey: 'companiesPerPage',
    pageKey: 'companiesPage',
  });

  if (companies.isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="grid grid-cols-12 gap-5">
      <DataTable className="col-span-12" table={table}>
        <DataTableAdvancedToolbar table={table}>
          <DataTableFilterList table={table} />
          <DataTableSortList table={table} />
          <Button
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, newCompany: true }) })
            }
            size={'sm'}
          >
            Create Company
          </Button>
        </DataTableAdvancedToolbar>
      </DataTable>
      {searchQuery.newCompany && <NewCompanyForm />}
      {searchQuery.editCompany && <EditCompanyForm />}
      {searchQuery.deleteCompany && <DeleteCompanyForm />}
    </div>
  );
}
