/**
 * Generated Zod schema for org_organization (from src/pocketbase/types.ts)
 */
import { z } from "zod";

export const organizationSchema = z.object({
  created: z.iso.datetime().optional(),
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  updated: z.iso.datetime().optional(),
});

export type Organization = z.infer<typeof organizationSchema>;
