/**
 * Generated Zod schema for tms_vehicles (from src/pocketbase/types.ts)
 */
import { z } from 'zod';
import {
  TmsVehiclesStatusOptions,
  TmsVehiclesVehicleTypeOptions,
} from '../../types';

export const vehiclesSchema = z.object({
  capacity_volume: z.number().optional(),
  capacity_weight: z.number().optional(),
  created: z.iso.datetime().optional(),
  id: z.string(),
  license_plate: z.string(),
  make: z.string(),
  model: z.string(),
  status: z.enum(TmsVehiclesStatusOptions).optional(),
  updated: z.iso.datetime().optional(),
  vehicle_number: z.string(),
  vehicle_type: z.enum(TmsVehiclesVehicleTypeOptions).optional(),
  year: z.iso.datetime(),
});

export type Vehicles = z.infer<typeof vehiclesSchema>;
