import { createORPCClient, onError } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import { RouterClient } from '@orpc/server';
import { ContractRouterClient } from '@orpc/contract';
import * as orpcRouter from '@/orpc/index';

// orpc integration
const link = new RPCLink({
  url: '/api/orpc',
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

export const orpcClient: RouterClient<typeof orpcRouter> =
  createORPCClient(link);
