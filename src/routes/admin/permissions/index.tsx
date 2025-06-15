import { client } from '@/lib/api';
import type { ListResult } from '@/lib/bindings/ListResult';
import type { RolePermissionResponseModel } from '@/lib/bindings/RolePermissionResponseModel';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/permissions/')({
  component: RouteComponent,
  loader: async () => {
    return {
      data:
        await client.get<ListResult<RolePermissionResponseModel>>(
          '/security/roles',
        ),
    };
  },
});

function RouteComponent() {
  const { data } = Route.useLoaderData();

  return <div>Total roles {data.data.total}</div>;
}
