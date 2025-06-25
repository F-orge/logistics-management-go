import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { router } from '.';
import { authRouter } from './auth';

export const rpcRouter = router({
  auth: authRouter,
});

export const client = createTRPCClient<typeof rpcRouter>({
  links: [
    httpBatchLink({
      url: '/trpc',
    }),
  ],
});
