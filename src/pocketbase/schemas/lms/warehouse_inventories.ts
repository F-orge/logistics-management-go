/**
 * Generated Zod schema for lms_warehouse_inventories (from src/pocketbase/types.ts)
 */
import { z } from 'zod';
import { LmsWarehouseInventoriesStatusOptions } from '../../types';

export const warehouseInventoriesSchema = z.object({
  arrived_at: z.iso.datetime().optional(),
  created: z.iso.datetime().optional(),
  departed_at: z.iso.datetime().optional(),
  id: z.string(),
  location_code: z.string().optional(),
  package: z.string().optional(),
  shipment: z.string().optional(),
  status: z.enum(LmsWarehouseInventoriesStatusOptions),
  updated: z.iso.datetime().optional(),
  warehouse: z.string().optional(),
});

export type WarehouseInventories = z.infer<typeof warehouseInventoriesSchema>;
