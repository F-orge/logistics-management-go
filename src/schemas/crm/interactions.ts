import { z } from 'zod';
import { CrmInteractionType } from '@/db/types';

export const crmInteractionSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  contactId: z.uuid({ message: 'Invalid UUID format for contact ID' }),
  caseId: z.uuid({ message: 'Invalid UUID format for case ID' }).nullable(),
  userId: z
    .string({ message: 'User ID must be a string' })
    .min(1, { message: 'User ID is required' })
    .max(255, { message: 'User ID must be at most 255 characters' }),
  type: z
    .enum(CrmInteractionType, { message: 'Invalid interaction type' })
    .nullable(),
  interactionDate: z.iso
    .datetime({ message: 'Invalid ISO datetime format for interaction date' })
    .nullable(),
  notes: z
    .string({ message: 'Notes must be a string' })
    .min(1, { message: 'Notes are required' })
    .max(1024, { message: 'Notes must be at most 1024 characters' })
    .nullable(),
  outcome: z
    .string({ message: 'Outcome must be a string' })
    .min(1, { message: 'Outcome is required' })
    .max(255, { message: 'Outcome must be at most 255 characters' })
    .nullable(),
  createdAt: z.iso
    .datetime({ message: 'Invalid ISO datetime format for creation date' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid ISO datetime format for update date' })
    .nullable(),
});

export type CrmInteraction = z.infer<typeof crmInteractionSchema>;

export const crmInteractionInsertSchema = crmInteractionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmInteractionUpdateSchema = crmInteractionInsertSchema.partial();
