import { z } from 'zod';

export const searchQuerySchema = z.object({
  shipmentsPage: z.number().default(1),
  shipmentsPerPage: z.number().default(10),
  id: z.string().optional(),
  newShipment: z.boolean().optional(),
  editShipment: z.boolean().optional(),
  deleteShipment: z.boolean().optional(),
});
