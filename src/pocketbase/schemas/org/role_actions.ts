/**
 * Generated Zod schema for org_role_actions (from src/pocketbase/types.ts)
 */
import { z } from 'zod';
import { OrgRoleActionsActionOptions } from '../../types';

export const roleActionsSchema = z.object({
  action: z.enum(OrgRoleActionsActionOptions),
  created: z.iso.datetime().optional(),
  id: z.string(),
  role: z.string(),
  updated: z.iso.datetime().optional(),
});

export type RoleActions = z.infer<typeof roleActionsSchema>;
