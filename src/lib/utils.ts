import { createServerFn } from '@tanstack/react-start';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import z, { ZodEnum } from 'zod';
import { db } from '@/db';
import { dbMiddleware } from '@/middleware/db';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const serverAction = createServerFn().middleware([dbMiddleware(db)]);

export const selectSchema = (fields: ZodEnum) =>
  z.object({
    page: z.number(),
    perPage: z.number(),
    sort: z
      .array(z.object({ field: fields, order: z.enum(['asc', 'desc']) }))
      .optional(),
  });
