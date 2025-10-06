import { z } from 'zod';

export const dmsDocumentCategorySchema = z.object({
  id: z.uuid(),
  name: z.string().min(1).max(255),
  description: z.string().nullable(),
  parentId: z.uuid().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type DmsDocumentCategory = z.infer<typeof dmsDocumentCategorySchema>;

export const dmsDocumentCategoryInsertSchema = dmsDocumentCategorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsDocumentCategoryUpdateSchema = dmsDocumentCategoryInsertSchema.partial();
