import { z } from 'zod';
import {
  DmsDeliveryFailureReasonEnum,
  DmsDeliveryTaskStatusEnum,
} from '@/db/types';

export const dmsDeliveryTaskSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  deliveryRouteId: z.uuid({
    message: 'Invalid UUID format for delivery route ID',
  }),
  status: z
    .enum(DmsDeliveryTaskStatusEnum, {
      message: 'Invalid delivery task status',
    })
    .nullable(),
  failureReason: z
    .enum(DmsDeliveryFailureReasonEnum, {
      message: 'Invalid delivery failure reason',
    })
    .nullable(),
  estimatedArrivalTime: z.iso
    .datetime({ message: 'Invalid date format for estimated arrival time' })
    .nullable(),
  deliveryTime: z.iso
    .datetime({ message: 'Invalid date format for delivery time' })
    .nullable(),
  deliveryAddress: z
    .string()
    .min(1, { error: 'Delivery address is required' })
    .max(255, { error: 'Delivery address must be at most 255 characters' }),
  recipientName: z
    .string()
    .min(1, { error: 'Recipient name is required' })
    .max(127, { error: 'Recipient name must be at most 127 characters' })
    .nullable(),
  recipientPhone: z
    .string()
    .min(1, { error: 'Recipient phone is required' })
    .max(32, { error: 'Recipient phone must be at most 32 characters' })
    .nullable(),
  deliveryInstructions: z
    .string()
    .min(1, { error: 'Delivery instructions are required' })
    .max(1024, {
      error: 'Delivery instructions must be at most 1024 characters',
    })
    .nullable(),
  actualArrivalTime: z.iso
    .datetime({ message: 'Invalid date format for actual arrival time' })
    .nullable(),
  attemptCount: z
    .number({ message: 'Attempt count must be a number' })
    .int({ message: 'Attempt count must be an integer' })
    .min(0, { message: 'Attempt count must be at least 0' })
    .nullable(),
  packageId: z.uuid({ message: 'Invalid UUID format for package ID' }),
  routeSequence: z
    .number({ message: 'Route sequence must be a number' })
    .int({ message: 'Route sequence must be an integer' })
    .min(0, { message: 'Route sequence must be at least 0' }),
  createdAt: z.iso
    .datetime({ message: 'Invalid date format for created at' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid date format for updated at' })
    .nullable(),
});

export type DmsDeliveryTask = z.infer<typeof dmsDeliveryTaskSchema>;

export const dmsDeliveryTaskInsertSchema = dmsDeliveryTaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsDeliveryTaskUpdateSchema =
  dmsDeliveryTaskInsertSchema.partial();
