import { z } from 'zod';
import { TmsVehicleServiceTypeEnum, TmsVehicleStatusEnum } from '@/db/types';

export const tmsVehicleSchema = z.object({
  id: z.uuid(),
  plateNumber: z
    .string()
    .min(1, { error: 'Plate number is required' })
    .max(32, { error: 'Plate number must be at most 32 characters' }),
  model: z
    .string()
    .min(1, { error: 'Model is required' })
    .max(255, { error: 'Model must be at most 255 characters' })
    .nullable(),
  serviceType: z.enum(TmsVehicleServiceTypeEnum).nullable(),
  status: z.enum(TmsVehicleStatusEnum).nullable(),
  capacity: z.coerce
    .number()
    .min(0, { error: 'Capacity must be at least 0' })
    .max(100000, { error: 'Capacity must be at most 100,000' })
    .nullable(),
  registrationNumber: z
    .string()
    .min(1, { error: 'Registration Number is required' })
    .max(100, { error: 'Registration Number must be at most 100 characters' }),
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
