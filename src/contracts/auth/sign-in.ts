import { oc } from '@orpc/contract';
import z from 'zod';
import { emailSignInSchema, userSchema } from '@/db/schemas/better-auth.schema';

export default oc.input(emailSignInSchema).output(
  z.object({
    redirect: z.boolean(),
    token: z.string(),
    url: z.url().optional(),
    user: userSchema,
  }),
);
