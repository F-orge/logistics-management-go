import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { pb } from '../../lib/pocketbase';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['healthCheck'],
    queryFn: () => pb.health.check(),
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Static Site Template</h1>
      {isLoading ? (
        'Loading'
      ) : (
        <p>
          Server status: {data?.code} - {data?.message}
        </p>
      )}
    </div>
  );
}
