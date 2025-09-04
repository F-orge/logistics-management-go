import { implement } from '@orpc/server';
import signOut from '@/contracts/auth/sign-out';
import { auth } from '@/lib/auth';
import type { GlobalVariables } from '@/server';

export default implement(signOut)
  .$context<GlobalVariables>()
  .handler(({ context }) =>
    auth.api.signOut({ headers: context.request.headers }),
  );
