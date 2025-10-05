import { z } from 'zod';

export const tmsVehicleMaintenanceSchema = z.object({
  id: z.string(),
  vehicleId: z.uuid(),
  description: z.string(),
  cost: z.coerce.number(),
  performedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsVehicleMaintenance = z.infer<typeof tmsVehicleMaintenanceSchema>;

export const tmsVehicleMaintenanceInsertSchema =
  tmsVehicleMaintenanceSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const tmsVehicleMaintenanceUpdateSchema =
  tmsVehicleMaintenanceInsertSchema.partial();
