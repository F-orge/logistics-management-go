/**
 * Generated Zod schema for users (from src/pocketbase/types.ts)
 */
import { z } from 'zod';

export const usersSchema = z.object({
  avatar: z.string().optional(),
  created: z.iso.datetime().optional(),
  email: z.email(),
  emailVisibility: z.boolean().optional(),
  id: z.string(),
  name: z.string().optional(),
  password: z.string(),
  tokenKey: z.string(),
  updated: z.iso.datetime().optional(),
  verified: z.boolean().optional(),
});

export const usersLoginSchema = usersSchema.pick({
  email: true,
  password: true,
});

export type Users = z.infer<typeof usersSchema>;
export type UsersLogin = z.infer<typeof usersLoginSchema>;
