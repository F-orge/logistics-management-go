import { z } from 'zod';
import { DmsTaskEventStatusEnum } from '@/db/types';

export const dmsTaskEventSchema = z.object({
  id: z.string(),
  deliveryTaskId: z.uuid(),
  status: z.enum(DmsTaskEventStatusEnum).nullable(),
  eventAt: z.iso.datetime().nullable(),
  notes: z.string().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type DmsTaskEvent = z.infer<typeof dmsTaskEventSchema>;

export const dmsTaskEventInsertSchema = dmsTaskEventSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsTaskEventUpdateSchema = dmsTaskEventInsertSchema.partial();
