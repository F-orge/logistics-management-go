import { createServerFn } from '@tanstack/react-start';
import z, { ZodEnum } from 'zod';
import { db } from '@/db';
import { dbMiddleware } from '@/middleware/db';

export const serverAction = createServerFn().middleware([dbMiddleware(db)]);

export const selectSchema = (fields: ZodEnum) =>
  z.object({
    page: z.number(),
    perPage: z.number(),
    sort: z
      .array(z.object({ field: fields, order: z.enum(['asc', 'desc']) }))
      .optional(),
  });
