import { z } from 'zod';

export const dmsDocumentAccessLogSchema = z.object({
  id: z.uuid(),
  documentId: z.uuid(),
  userId: z.uuid(),
  accessedAt: z.iso.datetime(),
  action: z.string().min(1).max(255),
  ipAddress: z.string().ip().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type DmsDocumentAccessLog = z.infer<typeof dmsDocumentAccessLogSchema>;

export const dmsDocumentAccessLogInsertSchema = dmsDocumentAccessLogSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsDocumentAccessLogUpdateSchema = dmsDocumentAccessLogInsertSchema.partial();
