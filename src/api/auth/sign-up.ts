import { implement } from '@orpc/server';
import signUp from '@/contracts/auth/sign-up';
import type { GlobalVariables } from '@/server';

export default implement(signUp)
  .$context<GlobalVariables>()
  .handler(({ context, input }) =>
    context.auth.api.signUpEmail({ body: input }),
  );
