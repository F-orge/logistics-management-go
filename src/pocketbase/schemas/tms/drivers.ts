/**
 * Generated Zod schema for tms_drivers (from src/pocketbase/types.ts)
 */
import { z } from "zod";
import { TmsDriversStatusOptions } from "../../types";

export const driversSchema = z.object({
  created: z.iso.datetime().optional(),
  email: z.email(),
  employee_id: z.string(),
  first_name: z.string(),
  hire_date: z.iso.datetime(),
  id: z.string(),
  last_name: z.string(),
  license_number: z.string(),
  phone_number: z.string(),
  status: z.enum(TmsDriversStatusOptions),
  updated: z.iso.datetime().optional(),
});

export type Drivers = z.infer<typeof driversSchema>;
