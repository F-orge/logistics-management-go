import { createORPCClient, onError } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import { BatchLinkPlugin } from '@orpc/client/plugins';
import { ContractRouterClient } from '@orpc/contract';
import {
  RouterClient,
  InferRouterInputs,
  InferRouterOutputs,
} from '@orpc/server';
import * as orpcRouter from '@/orpc/index';

// orpc integration
const link = new RPCLink({
  url: `${window.location.origin}/api/orpc`,
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
  plugins: [
    new BatchLinkPlugin({
      groups: [{ condition: (option) => true, context: {} }],
    }),
  ],
});

export const orpcClient: RouterClient<typeof orpcRouter> =
  createORPCClient(link);

export type ORPCInputs = InferRouterInputs<typeof orpcRouter>;

export type ORPCOutputs = InferRouterOutputs<typeof orpcRouter>;
