/**
 * Generated Zod schema for lms_warehouses (from src/pocketbase/types.ts)
 */
import { z } from "zod";
import { LmsWarehousesTypeOptions } from "../../types";

export const warehousesSchema = z.object({
  address: z.string(),
  capacity: z.number().optional(),
  code: z.string(),
  created: z.iso.datetime().optional(),
  id: z.string(),
  is_active: z.boolean().optional(),
  manager: z.string().optional(),
  name: z.string(),
  type: z.enum(LmsWarehousesTypeOptions),
  updated: z.iso.datetime().optional(),
});

export type Warehouses = z.infer<typeof warehousesSchema>;
