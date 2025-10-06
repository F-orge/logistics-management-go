import { z } from 'zod';

export const dmsFolderSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1).max(255),
  parentId: z.uuid().nullable(),
  createdByUserId: z.uuid(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type DmsFolder = z.infer<typeof dmsFolderSchema>;

export const dmsFolderInsertSchema = dmsFolderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsFolderUpdateSchema = dmsFolderInsertSchema.partial();
