import { createORPCClient, onError } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { BatchLinkPlugin } from "@orpc/client/plugins";
import type {
  InferRouterInputs,
  InferRouterOutputs,
  RouterClient,
} from "@orpc/server";
import type { handlers as orpcRouter } from "@packages/rpc";

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
