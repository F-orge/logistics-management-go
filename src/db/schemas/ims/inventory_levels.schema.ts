import { createSelectSchema } from 'drizzle-zod';
import { inventoryLevels } from './inventory_levels.sql';

export const inventoryLevelSchema = createSelectSchema(inventoryLevels);

export const insertInventoryLevelSchema = inventoryLevelSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateInventoryLevelSchema = insertInventoryLevelSchema.partial();
