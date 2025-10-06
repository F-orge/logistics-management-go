import { z } from 'zod';

export const dmsDocumentLinkSchema = z.object({
  id: z.uuid(),
  documentId: z.uuid(),
  linkedDocumentId: z.uuid(),
  linkType: z.string().min(1).max(255),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type DmsDocumentLink = z.infer<typeof dmsDocumentLinkSchema>;

export const dmsDocumentLinkInsertSchema = dmsDocumentLinkSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsDocumentLinkUpdateSchema = dmsDocumentLinkInsertSchema.partial();
