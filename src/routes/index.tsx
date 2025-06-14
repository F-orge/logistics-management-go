import type { HealthCheckResponse } from '@/bindings/HealthCheckResponse';
import { client } from '@/lib/api';
import { createFileRoute } from '@tanstack/react-router';
import type { AxiosError } from 'axios';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => {
    const res = await client.get<HealthCheckResponse>('/health');
    return { data: res.data };
  },
  onError: (err: AxiosError<{ code: number }>) => {
    console.error(err);
  },
});

function RouteComponent() {
  const { data } = Route.useLoaderData();

  return (
    <div>
      {data.code} - {data.message}
    </div>
  );
}
