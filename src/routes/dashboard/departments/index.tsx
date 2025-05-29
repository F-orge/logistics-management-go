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
  DepartmentsResponse,
} from '../../../../lib/pocketbase.gen';
import { listRecordsQuery } from '../../../queries';
import { type ExpandedDepartmentResponse, columns } from './-columns';
import DeleteDepartmentForm from './-delete';
import EditDepartmentForm from './-edit';
import NewDepartmentForm from './-new';
import { searchQuerySchema } from './-query';

export const Route = createFileRoute('/dashboard/departments/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchQuerySchema),
});

function RouteComponent() {
  const searchQuery = Route.useSearch();
  const navigate = Route.useNavigate();

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
    <div className="grid grid-cols-12 gap-5">
      <DataTable className="col-span-12" table={table}>
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
