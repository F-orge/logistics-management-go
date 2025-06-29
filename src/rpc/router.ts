import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { router } from '.';
import { authRouter } from './procedures/auth';
import { companyRouter } from './procedures/companies';
import { userRouter } from './procedures/users';

export const rpcRouter = router({
  auth: authRouter,
  users: userRouter,
  companies: companyRouter,
});

export const client = createTRPCClient<typeof rpcRouter>({
  links: [
    httpBatchLink({
      url: '/trpc',
    }),
  ],
});
