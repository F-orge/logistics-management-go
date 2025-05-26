import { z } from 'zod';

export const searchQuerySchema = z.object({
  warehousesPage: z.number().default(1),
  warehousesPerPage: z.number().default(10),
  id: z.string().optional(),
  newWarehouse: z.boolean().optional(),
  editWarehouse: z.boolean().optional(),
  deleteWarehouse: z.boolean().optional(),
});

export const newWarehouseFormSchema = z.object({
  name: z.string(),
  address: z.string(),
  longitude: z.coerce.number(),
  latitude: z.coerce.number(),
  manager: z.string(),
});

export const editWarehouseFormSchema = newWarehouseFormSchema.partial();
