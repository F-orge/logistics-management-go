import { fieldConfig } from '@autoform/zod';
import { z } from 'zod';

export const ContactSchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    name: z
      .string({ message: 'Name must be a string' })
      .min(1, { message: 'Name is required' })
      .max(255, { message: 'Name must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'Name',
          description: 'The full name of the contact.',
        }),
      ),
    email: z
      .email({ message: 'Invalid email format' })
      .min(1, { message: 'Email is required' })
      .max(255, { message: 'Email must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'Email',
          description: 'The email address of the contact.',
        }),
      ),
    companyId: z
      .uuid({ message: 'Invalid UUID format for company ID' })
      .check(
        fieldConfig({
          label: 'Company ID',
          description: 'The ID of the company this contact belongs to.',
        }),
      )
      .optional()
      .nullable(),
    jobTitle: z
      .string({ message: 'Job title must be a string' })
      .min(1, { message: 'Job title is required' })
      .max(127, { message: 'Job title must be at most 127 characters' })
      .check(
        fieldConfig({
          label: 'Job Title',
          description: 'The job title of the contact.',
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
          description: 'The ID of the user who owns this contact.',
        }),
      ),
    phoneNumber: z
      .e164({ message: 'Invalid phone number format' })
      .min(1, { message: 'Phone number is required' })
      .max(32, { message: 'Phone number must be at most 32 characters' })
      .check(
        fieldConfig({
          label: 'Phone Number',
          description: 'The phone number of the contact.',
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

