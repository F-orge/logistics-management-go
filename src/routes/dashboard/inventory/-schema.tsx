import { z } from 'zod';

export const searchQuerySchema = z.object({
  inventoryItemsPage: z.number().default(1),
  inventoryItemsPerPage: z.number().default(10),
  id: z.string().optional(),
  newInventoryItem: z.boolean().optional(),
  editInventoryItem: z.boolean().optional(),
  deleteInventoryItem: z.boolean().optional(),
});
