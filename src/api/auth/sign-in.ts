import { implement } from '@orpc/server';
import signIn from '@/contracts/auth/sign-in';
import { auth } from '@/lib/auth';

export default implement(signIn).handler(({ input }) =>
  auth.api.signInEmail({ body: input }),
);
