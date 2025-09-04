import { implement } from '@orpc/server';
import signIn from '@/contracts/auth/sign-in';
import type { GlobalVariables } from '@/server';

export default implement(signIn)
  .$context<GlobalVariables>()
  .handler(({ context, input }) =>
    context.auth.api.signInEmail({ body: input }),
  );
