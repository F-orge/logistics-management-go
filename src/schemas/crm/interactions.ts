import { z } from 'zod';
import { CrmInteractionType } from '@/db/types';

export const crmInteractionSchema = z.object({
  id: z.string(),
  contactId: z.uuid(),
  caseId: z.uuid().nullable(),
  userId: z.string(),
  type: z.enum(CrmInteractionType).nullable(),
  interactionDate: z.iso.datetime().nullable(),
  notes: z.string().nullable(),
  outcome: z.string().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type CrmInteraction = z.infer<typeof crmInteractionSchema>;

export const crmInteractionInsertSchema = crmInteractionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmInteractionUpdateSchema = crmInteractionInsertSchema.partial();
