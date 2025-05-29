import { z } from 'zod';
import type {
  UsersRecord,
  VehiclesResponse,
} from '../../../../../lib/pocketbase.gen';

export type ExpandedVehiclesResponse = VehiclesResponse<{
  currentDriver?: UsersRecord;
}>;

export const searchQuerySchema = z.object({
  vehiclesPage: z.number().default(1),
  vehiclesPerPage: z.number().default(10),
  id: z.string().optional(),
  newVehicle: z.boolean().optional(),
  editVehicle: z.boolean().optional(),
  deleteVehicle: z.boolean().optional(),
});

export const paginationConfig = {
  pageKey: 'vehiclesPage',
  perPageKey: 'vehiclesPerPage',
};
