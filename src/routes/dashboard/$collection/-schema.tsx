import { z } from 'zod';

export const searchQuerySchema = z.object({
  page: z.number().default(1),
  perPage: z.number().default(10),
  filter: z.array(z.object({})).optional(),
  sort: z.object({}).optional(),
  edit: z.boolean().optional(),
  new: z.boolean().optional(),
  delete: z.boolean().optional(),
  id: z.string().optional(),
  editField: z.string().optional(),
});
