import { z } from 'zod';
import { CrmInteractionType } from '@/db/types';

export const crmInteractionSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  contactId: z.uuid({ message: 'Invalid UUID format for contact ID' }),
  caseId: z.uuid({ message: 'Invalid UUID format for case ID' }).optional(),
  userId: z
    .string({ message: 'User ID must be a string' })
    .min(1, { message: 'User ID is required' })
    .max(255, { message: 'User ID must be at most 255 characters' }),
  type: z
    .enum(CrmInteractionType, { message: 'Invalid interaction type' })
    .optional(),
  interactionDate: z
    .date({ message: 'Invalid ISO datetime format for interaction date' })
    .optional(),
  notes: z
    .string({ message: 'Notes must be a string' })
    .min(1, { message: 'Notes are required' })
    .max(1024, { message: 'Notes must be at most 1024 characters' })
    .optional(),
  outcome: z
    .string({ message: 'Outcome must be a string' })
    .min(1, { message: 'Outcome is required' })
    .max(255, { message: 'Outcome must be at most 255 characters' })
    .optional(),
  createdAt: z
    .date({ message: 'Invalid ISO datetime format for creation date' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid ISO datetime format for update date' })
    .optional(),
}).strict();

export type CrmInteraction = z.infer<typeof crmInteractionSchema>;

export const crmInteractionInsertSchema = crmInteractionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmInteractionUpdateSchema = crmInteractionInsertSchema.partial();
