import { z } from 'zod';
import {
  DmsDeliveryFailureReasonEnum,
  DmsDeliveryTaskStatusEnum,
} from '@/db/types';

export const dmsDeliveryTaskSchema = z.object({
  id: z.uuid(),
  routeId: z.uuid(),
  status: z.enum(DmsDeliveryTaskStatusEnum).nullable(),
  failureReason: z.enum(DmsDeliveryFailureReasonEnum).nullable(),
  scheduledAt: z.iso.datetime().nullable(),
  deliveredAt: z.iso.datetime().nullable(),
  address: z
    .string()
    .min(1, { error: 'Address is required' })
    .max(255, { error: 'Address must be at most 255 characters' }),
  recipientName: z
    .string()
    .min(1, { error: 'Recipient name is required' })
    .max(127, { error: 'Recipient name must be at most 127 characters' })
    .nullable(),
  recipientPhone: z
    .e164()
    .min(1, { error: 'Recipient phone is required' })
    .max(32, { error: 'Recipient phone must be at most 32 characters' })
    .nullable(),
  notes: z
    .string()
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type DmsDeliveryTask = z.infer<typeof dmsDeliveryTaskSchema>;

export const dmsDeliveryTaskInsertSchema = dmsDeliveryTaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsDeliveryTaskUpdateSchema =
  dmsDeliveryTaskInsertSchema.partial();
