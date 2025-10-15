import { z } from 'zod'
import { TmsVehicleServiceTypeEnum, TmsVehicleStatusEnum } from '@/db.types'

export const VehicleSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  model: z
    .string({ message: 'Model must be a string' })
    .min(1, { error: 'Model is required' })
    .max(255, { error: 'Model must be at most 255 characters' })
    .optional()
    .nullable(),
  capacityVolume: z.coerce
    .number({ message: 'Capacity volume must be a number' })
    .min(0, { error: 'Capacity volume must be at least 0' })
    .max(100000, { error: 'Capacity volume must be at most 100,000' })
    .optional()
    .nullable(),
  capacityWeight: z.coerce
    .number({ message: 'Capacity weight must be a number' })
    .min(0, { error: 'Capacity weight must be at least 0' })
    .max(100000, { error: 'Capacity weight must be at most 100,000' })
    .optional()
    .nullable(),
  registrationNumber: z.string().optional(),
  make: z.string().optional().nullable(),
  year: z.coerce.number().optional().nullable(),
  vin: z.string().optional().nullable(),
  status: z.enum(TmsVehicleStatusEnum).optional().nullable(),
  currentMileage: z.coerce.number().optional().nullable(),
  lastMaintenanceDate: z.date().optional().nullable(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})

export type TmsVehicle = z.infer<typeof VehicleSchema>

export const VehicleInsertSchema = VehicleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const VehicleUpdateSchema = VehicleInsertSchema.partial()
