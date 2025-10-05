import { z } from 'zod';
import { TmsVehicleServiceTypeEnum, TmsVehicleStatusEnum } from '@/db/types';

export const tmsVehicleSchema = z.object({
  id: z.string(),
  plateNumber: z.string(),
  model: z.string().nullable(),
  serviceType: z.enum(TmsVehicleServiceTypeEnum).nullable(),
  status: z.enum(TmsVehicleStatusEnum).nullable(),
  capacity: z.string().nullable(), // Numeric as string
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsVehicle = z.infer<typeof tmsVehicleSchema>;

export const tmsVehicleInsertSchema = tmsVehicleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsVehicleUpdateSchema = tmsVehicleInsertSchema.partial();
