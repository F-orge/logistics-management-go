import { z } from 'zod';

export const wmsTaskSchema = z.object({
  id: z.uuid(),
  assignedTo: z.string().nullable(),
  status: z.string(),
  type: z.string(),
  dueAt: z.iso.datetime().nullable(),
  completedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type WmsTask = z.infer<typeof wmsTaskSchema>;

export const wmsTaskInsertSchema = wmsTaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsTaskUpdateSchema = wmsTaskInsertSchema.partial();
