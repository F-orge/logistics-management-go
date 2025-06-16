import { DataTable } from '@/components/ui/data-table';
import { client } from '@/lib/api';
import type { ListResult } from '@/lib/bindings/ListResult';
import type { RolePermissionResponseModel } from '@/lib/bindings/RolePermissionResponseModel';
import { createFileRoute } from '@tanstack/react-router';
import { columns } from './-columns';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';
import { H2 } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, PlusSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const Route = createFileRoute('/admin/access-control/')({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      page: z.number().min(1).default(1).catch(1),
      limit: z.number().min(10).default(10).catch(10),
      filterBy: z.string().optional(),
      filterValue: z.string().optional(),
      sortBy: z.string().optional(),
      sortOption: z.enum(['asc', 'desc']).optional(),
    }),
  ),
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps }) => {
    return {
      data: await client.get<ListResult<RolePermissionResponseModel>>(
        '/security/roles',
        { params: { page: deps.search.page - 1, limit: deps.search.limit } },
      ),
    };
  },
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const searchQuery = Route.useSearch();
  const { data } = Route.useLoaderData();

  return (
    <>
      <section className="col-span-12">
        <H2>Access Control</H2>
      </section>
      <section className="col-span-12 flex flex-col gap-2.5">
        <div className="col-span-2 col-start-11 grid grid-cols-12 gap-2.5 justify-between">
          <Input placeholder="Search..." className="col-span-3" />
          <Button
            className="col-start-11"
            onClick={() =>
              navigate({
                search: (prev) => ({ ...prev, new: true }),
              })
            }
          >
            <PlusSquare /> New
          </Button>
          <div className="col-start-12 flex flex-row gap-2.5 justify-self-end">
            <Button
              onClick={() =>
                navigate({
                  search: (prev) => ({ ...prev, page: prev.page - 1 }),
                })
              }
              disabled={searchQuery.page === 1}
              variant={'outline'}
              size={'icon'}
            >
              <ChevronLeft />
            </Button>
            <Button
              disabled={
                data.data.total_pages ===
                (searchQuery.page as unknown as bigint)
              }
              onClick={() =>
                navigate({
                  search: (prev) => ({ ...prev, page: prev.page + 1 }),
                })
              }
              variant={'outline'}
              size={'icon'}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div className="col-span-12">
          <DataTable data={data.data.items} columns={columns} />
        </div>
      </section>
    </>
  );
}
