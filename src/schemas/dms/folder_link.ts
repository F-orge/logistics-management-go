import { z } from 'zod';

export const dmsFolderLinkSchema = z.object({
  id: z.uuid(),
  folderId: z.uuid(),
  linkedFolderId: z.uuid(),
  linkType: z.string().min(1).max(255),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type DmsFolderLink = z.infer<typeof dmsFolderLinkSchema>;

export const dmsFolderLinkInsertSchema = dmsFolderLinkSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsFolderLinkUpdateSchema = dmsFolderLinkInsertSchema.partial();
