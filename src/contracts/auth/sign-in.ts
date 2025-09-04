import { oc } from '@orpc/contract';
import z from 'zod';
import { emailSignInSchema } from '@/db/schemas/better-auth.schema';
import { user } from '@/db/schemas/better-auth.sql';

export default oc.input(emailSignInSchema).output(
  z.object({
    redirect: z.boolean(),
    token: z.string(),
    url: z.url().optional(),
    user,
  }),
);
