import { fieldConfig } from '@autoform/zod';
import { z } from 'zod';

// Zod schema for .companies table

export const CompanySchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    name: z
      .string({ message: 'Company name must be a string' })
      .min(1, { message: 'Company name is required' })
      .max(255, { message: 'Company name must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'Company name',
          description: 'Enter the company name',
        }),
      ),
    ownerId: z
      .string({ message: 'Owner ID must be a string' })
      .max(255, { message: 'Owner ID must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'Owner ID',
          description: 'Enter the owner ID',
        }),
      )
      .nullable()
      .optional(),
    annualRevenue: z.coerce
      .number({ message: 'Annual revenue must be a number' })
      .min(0, { message: 'Annual revenue must be at least 0' })
      .check(
        fieldConfig({
          label: 'Annual revenue',
          description: 'Enter the annual revenue',
        }),
      )
      .optional()
      .nullable(),
    city: z
      .string({ message: 'City must be a string' })
      .min(1, { message: 'City is required' })
      .max(127, { message: 'City must be at most 127 characters' })
      .check(
        fieldConfig({
          label: 'City',
          description: 'Enter the city',
        }),
      )
      .optional()
      .nullable(),
    country: z
      .string({ message: 'Country must be a string' })
      .min(1, { message: 'Country is required' })
      .max(127, { message: 'Country must be at most 127 characters' })
      .check(
        fieldConfig({
          label: 'Country',
          description: 'Enter the country',
        }),
      )
      .optional()
      .nullable(),
    industry: z
      .string({ message: 'Industry must be a string' })
      .min(1, { message: 'Industry is required' })
      .max(127, { message: 'Industry must be at most 127 characters' })
      .check(
        fieldConfig({
          label: 'Industry',
          description: 'Enter the industry',
        }),
      )
      .optional()
      .nullable(),
    phoneNumber: z
      .e164({ message: 'Invalid phone number format' })
      .min(1, { message: 'Phone number is required' })
      .max(32, { message: 'Phone number must be at most 32 characters' })
      .check(
        fieldConfig({
          label: 'Phone number',
          description: 'Enter the phone number',
        }),
      )
      .optional()
      .nullable(),
    postalCode: z
      .string({ message: 'Postal code must be a string' })
      .min(1, { message: 'Postal code is required' })
      .max(32, { message: 'Postal code must be at most 32 characters' })
      .check(
        fieldConfig({
          label: 'Postal code',
          description: 'Enter the postal code',
        }),
      )
      .optional()
      .nullable(),
    state: z
      .string({ message: 'State must be a string' })
      .min(1, { message: 'State is required' })
      .max(127, { message: 'State must be at most 127 characters' })
      .check(
        fieldConfig({
          label: 'State',
          description: 'Enter the state',
        }),
      )
      .optional()
      .nullable(),
    street: z
      .string({ message: 'Street must be a string' })
      .min(1, { message: 'Street is required' })
      .max(255, { message: 'Street must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'Street',
          description: 'Enter the street address',
        }),
      )
      .optional()
      .nullable(),
    website: z
      .url({ message: 'Invalid URL format for website' })
      .min(1, { message: 'Website is required' })
      .max(255, { message: 'Website must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'Website',
          description: 'Enter the company website URL',
        }),
      )
      .optional()
      .nullable(),
    createdAt: z
      .date({
        message: 'Invalid ISO datetime format for creation date',
      })
      .optional()
      .nullable(),
    updatedAt: z
      .date({
        message: 'Invalid ISO datetime format for update date',
      })
      .optional()
      .nullable(),
  })
  .strict();
