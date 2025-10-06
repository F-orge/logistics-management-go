import { z } from 'zod';

export const dmsDocumentSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1).max(255),
  filePath: z.string().min(1).max(1024),
  fileSize: z.number().int().positive(),
  mimeType: z.string().min(1).max(127),
  categoryId: z.uuid().nullable(),
  uploadedByUserId: z.uuid(),
  uploadedAt: z.iso.datetime(),
  lastModifiedAt: z.iso.datetime().nullable(),
  version: z.number().int().positive().default(1),
  isPublic: z.boolean().default(false),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type DmsDocument = z.infer<typeof dmsDocumentSchema>;

export const dmsDocumentInsertSchema = dmsDocumentSchema.omit({
  id: true,
  uploadedAt: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsDocumentUpdateSchema = dmsDocumentInsertSchema.partial();
