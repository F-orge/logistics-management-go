import { implement } from '@orpc/server';
import signUp from '@/contracts/auth/sign-up';
import { auth } from '@/lib/auth';

export default implement(signUp).handler(({ input }) =>
  auth.api.signUpEmail({ body: input }),
);
