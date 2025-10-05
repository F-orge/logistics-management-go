import { z } from 'zod';

export const tmsVehicleMaintenanceSchema = z.object({
  id: z.uuid(),
  vehicleId: z.uuid(),
  description: z
    .string()
    .min(1, { error: 'Description is required' })
    .max(255, { error: 'Description must be at most 255 characters' }),
  cost: z.coerce
    .number()
    .min(0, { error: 'Cost must be at least 0' })
    .max(1000000, { error: 'Cost must be at most 1,000,000' }),
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
