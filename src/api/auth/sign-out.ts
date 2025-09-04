import { implement } from '@orpc/server';
import signOut from '@/contracts/auth/sign-out';
import type { GlobalVariables } from '@/server';

export default implement(signOut)
  .$context<GlobalVariables>()
  .handler(({ context }) =>
    context.auth.api.signOut({ headers: context.request.headers }),
  );
