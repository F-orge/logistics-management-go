import type { ColumnDef } from '@tanstack/react-table';
import type { RecordOptions } from 'pocketbase';
import type React from 'react';
import type { ZodObject } from 'zod';
import { Route } from '.';
import DeleteRouteForm from './-actions/routes/delete';
import EditRouteForm from './-actions/routes/edit';
import NewRouteForm from './-actions/routes/new';
import DeleteVehicleForm from './-actions/vehicles/delete';
import EditVehicleForm from './-actions/vehicles/edit';
import NewVehicleForm from './-actions/vehicles/new';
import { columns as routesColumn } from './-columns/routes';
import { columns as vehicleColumns } from './-columns/vehicles';
import {
  paginationConfig as routesPaginationConfig,
  searchQuerySchema as routesSearchQuerySchema,
} from './-schemas/routes';
import {
  paginationConfig as vehiclePaginationConfig,
  searchQuerySchema as vehicleSearchQuerySchema,
} from './-schemas/vehicles';

export default [
  {
    name: 'routes',
    columns: routesColumn as ColumnDef<unknown>[],
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
  {
    name: 'vehicles',
    columns: vehicleColumns as ColumnDef<unknown>[],
    searchQueryConfig: vehicleSearchQuerySchema,
    toolbarComponents: [
      () => <NewVehicleForm />,
      () => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const searchQuery = Route.useSearch() as Record<string, any>;
        return (
          <>
            {searchQuery.editVehicle && <EditVehicleForm />}
            {searchQuery.deleteVehicle && <DeleteVehicleForm />}
          </>
        );
      },
    ],
    recordOption: { expand: 'currentDriver' },
  },
] satisfies {
  name: string;
  columns: ColumnDef<unknown>[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  searchQueryConfig: ZodObject<any>;
  toolbarComponents?: (() => React.JSX.Element)[];
  recordOption?: RecordOptions;
}[];
