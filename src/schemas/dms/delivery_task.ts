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
  address: z.string(),
  recipientName: z.string().nullable(),
  recipientPhone: z.string().nullable(),
  notes: z.string().nullable(),
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
