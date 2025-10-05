import { z } from 'zod';
import { DmsTaskEventStatusEnum } from '@/db/types';

export const dmsTaskEventSchema = z.object({
  id: z.uuid(),
  deliveryTaskId: z.uuid(),
  status: z.enum(DmsTaskEventStatusEnum).nullable(),
  eventAt: z.iso.datetime().nullable(),
  notes: z
    .string()
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .nullable(),
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
