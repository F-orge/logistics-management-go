import { z } from 'zod'
import { TmsVehicleServiceTypeEnum } from '../../db.types'

export const VehicleMaintenanceSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  vehicleId: z.uuid({ message: 'Invalid UUID format for vehicle ID' }),
  cost: z.coerce
    .number({ message: 'Cost must be a number' })
    .min(0, { error: 'Cost must be at least 0' })
    .max(1000000, { error: 'Cost must be at most 1,000,000' }),
  notes: z.string({ message: 'Notes must be a string' }).optional().nullable(),
  serviceDate: z.date({ message: 'Invalid date format for service date' }),
  serviceType: z
    .enum(TmsVehicleServiceTypeEnum, {
      message: 'Invalid vehicle service type',
    })
    .optional()
    .nullable(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})

export type TmsVehicleMaintenance = z.infer<typeof VehicleMaintenanceSchema>

export const VehicleMaintenanceInsertSchema = VehicleMaintenanceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const VehicleMaintenanceUpdateSchema = VehicleMaintenanceInsertSchema.partial()
