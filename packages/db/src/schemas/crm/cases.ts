import { fieldConfig } from '@autoform/zod';
import { z } from 'zod';
import { CrmCasePriority, CrmCaseStatus, CrmCaseType } from '@/db.types';

export const CaseSchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    caseNumber: z
      .string({ message: 'Case number must be a string' })
      .min(1, { message: 'Case number is required' })
      .max(127, { message: 'Case number must be at most 127 characters' })
      .check(
        fieldConfig({
          label: 'Case Number',
          description: 'The unique identifier for the case.',
        }),
      ),
    contactId: z
      .uuid({ message: 'Invalid UUID format for contact ID' })
      .check(
        fieldConfig({
          label: 'Contact ID',
          description: 'The ID of the contact associated with this case.',
        }),
      )
      .optional()
      .nullable(),
    description: z
      .string({ message: 'Description must be a string' })
      .min(1, { message: 'Description is required' })
      .max(1024, { message: 'Description must be at most 1024 characters' })
      .check(
        fieldConfig({
          label: 'Description',
          description: 'A detailed description of the case.',
        }),
      )
      .optional()
      .nullable(),
    ownerId: z
      .string({ message: 'Owner ID must be a string' })
      .min(1, { message: 'Owner ID is required' })
      .max(255, { message: 'Owner ID must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'Owner ID',
          description: 'The ID of the user who owns this case.',
        }),
      ),
    priority: z
      .enum(CrmCasePriority, { message: 'Invalid case priority' })
      .check(
        fieldConfig({
          label: 'Priority',
          description: 'The priority level of the case.',
        }),
      )
      .optional()
      .nullable(),
    status: z
      .enum(CrmCaseStatus, { message: 'Invalid case status' })
      .check(
        fieldConfig({
          label: 'Status',
          description: 'The current status of the case.',
        }),
      )
      .optional()
      .nullable(),
    type: z
      .enum(CrmCaseType, { message: 'Invalid case type' })
      .check(
        fieldConfig({
          label: 'Type',
          description: 'The type of case.',
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
  .strict();