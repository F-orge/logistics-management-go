import { z } from 'zod';
import { CrmInteractionType } from '@/db/types';

export const crmInteractionSchema = z.object({
  id: z
    .string()
    .min(1, { error: 'ID is required' })
    .max(255, { error: 'ID must be at most 255 characters' }),
  contactId: z.uuid(),
  caseId: z.uuid().nullable(),
  userId: z
    .string()
    .min(1, { error: 'User ID is required' })
    .max(255, { error: 'User ID must be at most 255 characters' }),
  type: z.enum(CrmInteractionType).nullable(),
  interactionDate: z.iso.datetime().nullable(),
  notes: z
    .string()
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .nullable(),
  outcome: z
    .string()
    .min(1, { error: 'Outcome is required' })
    .max(255, { error: 'Outcome must be at most 255 characters' })
    .nullable(),
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
