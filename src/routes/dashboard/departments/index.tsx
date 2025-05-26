import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { searchQuerySchema } from './-query';
import { useQuery } from '@tanstack/react-query';
import { listRecordsQuery } from '../../../queries';
import {
  Collections,
  DepartmentsResponse,
} from '../../../../lib/pocketbase.gen';
import { columns, type ExpandedDepartmentResponse } from './-columns';
import { useDataTable } from '@marahuyo/react-ui/hooks/use-data-table';
import { DataTable } from '@marahuyo/react-ui/data-table/data-table';
import { DataTableAdvancedToolbar } from '@marahuyo/react-ui/data-table/data-table-advanced-toolbar';
import { DataTableFilterList } from '@marahuyo/react-ui/data-table/data-table-filter-list';
import { DataTableSortList } from '@marahuyo/react-ui/data-table/data-table-sort-list';
import { Button } from '@marahuyo/react-ui/ui/button';
import NewDepartmentForm from './-new';
import EditDepartmentForm from './-edit';
import DeleteDepartmentForm from './-delete';

export const Route = createFileRoute('/dashboard/departments/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchQuerySchema),
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const departments = useQuery(
    listRecordsQuery<ExpandedDepartmentResponse>(
      Collections.Departments,
      {
        page: searchQuery.departmentsPage,
        perPage: searchQuery.departmentsPerPage,
      },
      { expand: 'managers,employees' },
    ),
  );

  const { table } = useDataTable({
    data: departments.data?.items || [],
    columns,
    pageCount: departments.data?.totalPages || 0,
    pageKey: 'departmentsPage',
    perPageKey: 'departmentsPerPage',
  });

  return (
    <div>
      <DataTable table={table}>
        <DataTableAdvancedToolbar table={table}>
          <DataTableFilterList table={table} />
          <DataTableSortList table={table} />
          <Button
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, newDepartment: true }) })
            }
            size={'sm'}
          >
            Create Department
          </Button>
        </DataTableAdvancedToolbar>
      </DataTable>
      {searchQuery.newDepartment && <NewDepartmentForm />}
      {searchQuery.editDepartment && <EditDepartmentForm />}
      {searchQuery.deleteDepartment && <DeleteDepartmentForm />}
    </div>
  );
}
