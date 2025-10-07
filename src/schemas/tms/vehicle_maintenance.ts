import { z } from 'zod';

export const tmsVehicleMaintenanceSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  vehicleId: z.uuid({ message: 'Invalid UUID format for vehicle ID' }),
  description: z
    .string({ message: 'Description must be a string' })
    .min(1, { error: 'Description is required' })
    .max(255, { error: 'Description must be at most 255 characters' }),
  cost: z.coerce
    .number({ message: 'Cost must be a number' })
    .min(0, { error: 'Cost must be at least 0' })
    .max(1000000, { error: 'Cost must be at most 1,000,000' }),
  performedAt: z
    .date({ message: 'Invalid date format for performed at' })
    .optional(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional(),
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
