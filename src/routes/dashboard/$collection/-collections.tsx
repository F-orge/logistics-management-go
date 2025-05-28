import type { ColumnDef } from '@tanstack/react-table';
import type { ZodObject } from 'zod';
import type React from 'react';
import { columns as routesColumn } from './-columns/routes';
import {
  paginationConfig as routesPaginationConfig,
  searchQuerySchema as routesSearchQuerySchema,
} from './-schemas/routes';
import NewRouteForm from './-actions/routes/new';
import { Route } from '.';
import EditRouteForm from './-actions/routes/edit';
import DeleteRouteForm from './-actions/routes/delete';
import type { RecordOptions } from 'pocketbase';

export default [
  {
    name: 'routes',
    columns: routesColumn as ColumnDef<unknown>[],
    paginationConfig: routesPaginationConfig,
    searchQueryConfig: routesSearchQuerySchema,
    toolbarComponents: [
      () => <NewRouteForm key={1} />,
      () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const searchQuery = Route.useSearch() as Record<string, any>;
        return (
          <>
            {searchQuery.editRoute && <EditRouteForm />}
            {searchQuery.deleteRoute && <DeleteRouteForm />}
          </>
        );
      },
    ],
    recordOption: { expand: 'vehicleAssigned,driverAssigned,shipmentsOnRoute' },
  },
] satisfies {
  name: string;
  columns: ColumnDef<unknown>[];
  paginationConfig: { pageKey: string; perPageKey: string };
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  searchQueryConfig: ZodObject<any>;
  toolbarComponents?: (() => React.JSX.Element)[];
  recordOption?: RecordOptions;
}[];
