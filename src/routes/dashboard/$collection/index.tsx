import { createFileRoute } from '@tanstack/react-router';
import { columns as routesColumn } from './-columns/routes';
import { paginationConfig as routesPaginationConfig } from './-schemas/routes';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { listRecordsQuery } from '../../../queries';

const collections = [
  {
    name: 'routes',
    columns: routesColumn,
    paginationConfig: routesPaginationConfig,
  },
];

export const Route = createFileRoute('/dashboard/$collection/')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const searchQuery = Route.useSearch();

  const collectionMetadata = useMemo(
    () =>
      collections.find((collection) => collection.name === params.collection),
    [params],
  );

  const collectionResponse = useQuery(
    listRecordsQuery(collectionMetadata?.name, { page: 1, perPage: 500 }),
  );

  return <div>{collectionMetadata?.name}</div>;
}
