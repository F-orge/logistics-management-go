import { z } from 'zod';

export const searchQuerySchema = z.object({
  ordersPage: z.number().default(1),
  ordersPerPage: z.number().default(10),
  id: z.string().optional(),
  newOrder: z.boolean().optional(),
  editOrder: z.boolean().optional(),
  deleteOrder: z.boolean().optional(),
});
