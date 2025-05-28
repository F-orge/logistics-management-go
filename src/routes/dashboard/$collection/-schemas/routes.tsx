import { z } from 'zod';
import type {
  RoutesResponse,
  ShipmentsRecord,
  UsersRecord,
  VehiclesRecord,
} from '../../../../../lib/pocketbase.gen';

export type ExpandedRoutesResponse = RoutesResponse<{
  vehicleAssigned?: VehiclesRecord;
  driverAssigned?: UsersRecord;
  shipmentsOnRoute?: ShipmentsRecord[];
}>;

export const searchQuerySchema = z.object({
  routesPage: z.number().default(1),
  routesPerPage: z.number().default(10),
  id: z.string().optional(),
  newRoute: z.boolean().optional(),
  editRoute: z.boolean().optional(),
  deleteRoute: z.boolean().optional(),
});

export const paginationConfig = {
  pageKey: 'routesPage',
  perPageKey: 'routesPerPage',
};
