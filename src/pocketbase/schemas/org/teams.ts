/**
 * Generated Zod schema for org_teams (from src/pocketbase/types.ts)
 */
import { z } from 'zod';

export const teamsSchema = z.object({
  created: z.iso.datetime().optional(),
  description: z.string(),
  id: z.string(),
  name: z.string(),
  organization: z.string(),
  updated: z.iso.datetime().optional(),
});

export type Teams = z.infer<typeof teamsSchema>;
