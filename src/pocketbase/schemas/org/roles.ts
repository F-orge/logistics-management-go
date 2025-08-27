/**
 * Generated Zod schema for org_roles (from src/pocketbase/types.ts)
 */
import { z } from 'zod';

export const rolesSchema = z.object({
  created: z.iso.datetime().optional(),
  description: z.string().optional(),
  id: z.string(),
  name: z.string(),
  organization: z.string().optional(),
  updated: z.iso.datetime().optional(),
});

export type Roles = z.infer<typeof rolesSchema>;
