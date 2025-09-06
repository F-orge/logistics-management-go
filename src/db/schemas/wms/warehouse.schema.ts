// Zod schema for wms_warehouses
import { createSelectSchema } from 'drizzle-zod';
import { warehouses } from './warehouse.sql';

export const warehouseSchema = createSelectSchema(warehouses);

export const insertWarehouseSchema = warehouseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateWarehouseSchema = insertWarehouseSchema.partial();
