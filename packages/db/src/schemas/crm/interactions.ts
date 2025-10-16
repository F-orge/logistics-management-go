import { fieldConfig } from '@autoform/zod'
import { z } from 'zod'
import { CrmInteractionType } from '../../db.types'

export const InteractionSchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    contactId: z.uuid({ message: 'Invalid UUID format for contact ID' }).check(
      fieldConfig({
        label: 'Contact ID',
        description: 'The ID of the contact for this interaction.',
      }),
    ),
    caseId: z
      .uuid({ message: 'Invalid UUID format for case ID' })
      .check(
        fieldConfig({
          label: 'Case ID',
          description: 'The ID of the case related to this interaction.',
        }),
      )
      .optional()
      .nullable(),
    userId: z
      .string({ message: 'User ID must be a string' })
      .min(1, { message: 'User ID is required' })
      .max(255, { message: 'User ID must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'User ID',
          description: 'The ID of the user who logged this interaction.',
        }),
      ),
    type: z
      .enum(CrmInteractionType, { message: 'Invalid interaction type' })
      .check(
        fieldConfig({
          label: 'Type',
          description: 'The type of interaction.',
        }),
      )
      .optional()
      .nullable(),
    interactionDate: z
      .date({ message: 'Invalid ISO datetime format for interaction date' })
      .check(
        fieldConfig({
          label: 'Interaction Date',
          description: 'The date and time of the interaction.',
        }),
      )
      .optional()
      .nullable(),
    notes: z
      .string({ message: 'Notes must be a string' })
      .min(1, { message: 'Notes are required' })
      .max(1024, { message: 'Notes must be at most 1024 characters' })
      .check(
        fieldConfig({
          label: 'Notes',
          description: 'Detailed notes about the interaction.',
        }),
      )
      .optional()
      .nullable(),
    outcome: z
      .string({ message: 'Outcome must be a string' })
      .min(1, { message: 'Outcome is required' })
      .max(255, { message: 'Outcome must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'Outcome',
          description: 'The outcome of the interaction.',
        }),
      )
      .optional()
      .nullable(),
    createdAt: z
      .date({ message: 'Invalid ISO datetime format for creation date' })
      .optional()
      .nullable(),
    updatedAt: z
      .date({ message: 'Invalid ISO datetime format for update date' })
      .optional()
      .nullable(),
  })
  .strict()
