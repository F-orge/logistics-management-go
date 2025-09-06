// Zod schema for ims_inventory_adjustments
import { createSelectSchema } from 'drizzle-zod';
import { inventoryAdjustments } from './inventory_adjustments.sql';

export const inventoryAdjustmentSchema =
  createSelectSchema(inventoryAdjustments);

export const insertInventoryAdjustmentSchema = inventoryAdjustmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateInventoryAdjustmentSchema =
  insertInventoryAdjustmentSchema.partial();
