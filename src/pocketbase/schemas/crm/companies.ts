/**
 * Generated Zod schema for crm_companies (from src/pocketbase/types.ts)
 */
import { z } from "zod";

export const companiesSchema = z.object({
  created: z.iso.datetime().optional(),
  description: z.string().optional(),
  email: z.email().optional(),
  id: z.string(),
  industry: z.string().optional(),
  name: z.string(),
  phone_number: z.string().optional(),
  updated: z.iso.datetime().optional(),
  website: z.string().optional(),
});

export type Companies = z.infer<typeof companiesSchema>;
