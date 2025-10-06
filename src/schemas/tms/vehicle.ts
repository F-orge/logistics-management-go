import { z } from 'zod';
import { TmsVehicleServiceTypeEnum, TmsVehicleStatusEnum } from '@/db/types';

export const tmsVehicleSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  plateNumber: z
    .string({ message: 'Plate number must be a string' })
    .min(1, { error: 'Plate number is required' })
    .max(32, { error: 'Plate number must be at most 32 characters' }),
  model: z
    .string({ message: 'Model must be a string' })
    .min(1, { error: 'Model is required' })
    .max(255, { error: 'Model must be at most 255 characters' })
    .nullable(),
  serviceType: z
    .enum(TmsVehicleServiceTypeEnum, {
      message: 'Invalid vehicle service type',
    })
    .nullable(),
  status: z
    .enum(TmsVehicleStatusEnum, { message: 'Invalid vehicle status' })
    .nullable(),
  capacity: z.coerce
    .number({ message: 'Capacity must be a number' })
    .min(0, { error: 'Capacity must be at least 0' })
    .max(100000, { error: 'Capacity must be at most 100,000' })
    .nullable(),
  registrationNumber: z
    .string({ message: 'Registration number must be a string' })
    .min(1, { error: 'Registration Number is required' })
    .max(100, { error: 'Registration Number must be at most 100 characters' }),
  createdAt: z.iso
    .datetime({ message: 'Invalid date format for created at' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid date format for updated at' })
    .nullable(),
});

export type TmsVehicle = z.infer<typeof tmsVehicleSchema>;

export const tmsVehicleInsertSchema = tmsVehicleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsVehicleUpdateSchema = tmsVehicleInsertSchema.partial();
