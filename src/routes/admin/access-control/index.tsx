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
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Route = createFileRoute('/admin/access-control/')({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      page: z.number().min(1).default(1).catch(1),
      limit: z.number().min(10).default(10).catch(10),
      id: z.string().optional(),
      new: z.boolean().optional(),
      view: z.boolean().optional(),
      edit: z.boolean().optional(),
      delete: z.boolean().optional(),
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
        <div className="col-span-2 col-start-11 flex flex-row gap-2.5 justify-end">
          <Button
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, page: prev.page - 1 }) })
            }
            disabled={searchQuery.page === 1}
            variant={'outline'}
            size={'icon'}
          >
            <ChevronLeft />
          </Button>
          <Button
            disabled={data.data.items.length === 0}
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, page: prev.page + 1 }) })
            }
            variant={'outline'}
            size={'icon'}
          >
            <ChevronRight />
          </Button>
        </div>
        <div className="col-span-12">
          <DataTable data={data.data.items} columns={columns} />
        </div>
      </section>
    </>
  );
}
