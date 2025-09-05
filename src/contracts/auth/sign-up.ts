import { oc } from '@orpc/contract';
import z from 'zod';
import { emailSignUpSchema, userSchema } from '@/db/schemas/better-auth.schema';

export default oc
  .input(emailSignUpSchema)
  .output(z.object({ token: z.string().nullish(), user: userSchema }));
