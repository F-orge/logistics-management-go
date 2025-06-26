import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { router } from '.';
import { authRouter } from './procedures/auth';
import { userRouter } from './procedures/users';

export const rpcRouter = router({
  auth: authRouter,
  user: userRouter,
});

export const client = createTRPCClient<typeof rpcRouter>({
  links: [
    httpBatchLink({
      url: '/trpc',
    }),
  ],
});
