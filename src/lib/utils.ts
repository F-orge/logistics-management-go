import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import z, { ZodEnum } from 'zod';
import { buildZodFieldConfig } from '@autoform/react';
import { FieldTypes } from '@/components/ui/autoform';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const selectClientQueryValidator = (fields: ZodEnum) =>
  z.object({
    page: z.number().min(1).default(1).catch(1),
    perPage: z.number().min(10).default(10).catch(10),
    sort: z
      .array(z.object({ field: fields, order: z.enum(['asc', 'desc']) }))
      .optional(),
    id: z.string().optional(),
    delete: z.boolean().optional(),
    new: z.boolean().optional(),
  });

export const nonEmpty = (value: unknown): value is string =>
  typeof value === 'string' && value.length > 0;
