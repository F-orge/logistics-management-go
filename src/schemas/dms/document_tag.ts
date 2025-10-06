import { z } from 'zod';

export const dmsDocumentTagSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1).max(255),
  description: z.string().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type DmsDocumentTag = z.infer<typeof dmsDocumentTagSchema>;

export const dmsDocumentTagInsertSchema = dmsDocumentTagSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsDocumentTagUpdateSchema = dmsDocumentTagInsertSchema.partial();
