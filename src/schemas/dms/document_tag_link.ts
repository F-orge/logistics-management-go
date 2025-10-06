import { z } from 'zod';

export const dmsDocumentTagLinkSchema = z.object({
  id: z.uuid(),
  documentId: z.uuid(),
  tagId: z.uuid(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type DmsDocumentTagLink = z.infer<typeof dmsDocumentTagLinkSchema>;

export const dmsDocumentTagLinkInsertSchema = dmsDocumentTagLinkSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsDocumentTagLinkUpdateSchema = dmsDocumentTagLinkInsertSchema.partial();
