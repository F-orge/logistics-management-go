/**
 * Generated Zod schema for org_team_resources (from src/pocketbase/types.ts)
 */
import { z } from "zod";

export const teamResourcesSchema = z.object({
  created: z.iso.datetime().optional(),
  id: z.string(),
  resource: z.string(),
  updated: z.iso.datetime().optional(),
});

export type TeamResources = z.infer<typeof teamResourcesSchema>;
