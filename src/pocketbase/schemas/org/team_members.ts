/**
 * Generated Zod schema for org_team_members (from src/pocketbase/types.ts)
 */
import { z } from 'zod';

export const teamMembersSchema = z.object({
  created: z.iso.datetime().optional(),
  id: z.string(),
  team: z.string(),
  updated: z.iso.datetime().optional(),
  user: z.string(),
});

export type TeamMembers = z.infer<typeof teamMembersSchema>;
