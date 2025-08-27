/**
 * Generated Zod schema for org_team_roles (from src/pocketbase/types.ts)
 */
import { z } from 'zod';

export const teamRolesSchema = z.object({
  created: z.iso.datetime().optional(),
  id: z.string(),
  roles: z.string(),
  team: z.string(),
  updated: z.iso.datetime().optional(),
});

export type TeamRoles = z.infer<typeof teamRolesSchema>;
