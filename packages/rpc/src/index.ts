import type {
  InferRouterInputs,
  InferRouterOutputs,
  RouterClient,
} from "@orpc/server";
import type { DB } from "@packages/db/db.types";
import type { Kysely } from "kysely";
import * as orpcRouter from "./handlers/index";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export interface ORPCContext {
  kysely: Kysely<DB>;
}

export type ORPCServerInputs = InferRouterInputs<typeof orpcRouter>;
export type ORPCServerOutputs = InferRouterInputs<typeof orpcRouter>;

export const buildOrpcQueryOptions = <
  Schema extends keyof RouterClient<typeof orpcRouter>,
  Table extends keyof RouterClient<typeof orpcRouter>[Schema]
>(
  client: RouterClient<typeof orpcRouter>
) => {
  const orpcQueryOption = (
    schema: Schema,
    table: Table,
    options: ORPCServerInputs[Schema][Table]
  ) =>
    queryOptions<
      ORPCServerOutputs[Schema][Table],
      void,
      ORPCServerInputs[Schema][Table]
    >({
      queryKey: [schema, table],
      queryFn: async () => (client[schema][table] as any)(options),
    });

  return orpcQueryOption;
};

// export const buildOrpcQueriesAndMutations = (
//   client: RouterClient<typeof orpcRouter>
// ) => {
//   const orpcQueryOption = <
//     Schema extends keyof typeof client,
//     Table extends keyof (typeof client)[Schema]
//   >(
//     schema: Schema,
//     table: Table,
//     options: ORPCServerInputs[Schema][Table]
//   ) =>
//     queryOptions<
//       ORPCServerOutputs[Schema][Table],
//       void,
//       ORPCServerInputs[Schema][Table]
//     >({
//       queryKey: [schema, table],
//       queryFn: async () => (client[schema][table] as any)(options),
//     });

//   const orpcMutationOption = <
//     Schema extends keyof typeof client,
//     Table extends keyof (typeof client)[Schema]
//   >(
//     schema: Schema,
//     table: Table
//   ) =>
//     mutationOptions<
//       ORPCServerOutputs[Schema][Table],
//       void,
//       ORPCServerInputs[Schema][Table]
//     >({
//       mutationKey: [schema, table],
//       mutationFn: (value) => (client[schema][table] as any)(value),
//       onSuccess: (_data, _t, _s, w) => {
//         w.client.invalidateQueries({ queryKey: [schema, table] });
//       },
//     });

//   return { orpcMutationOption, orpcQueryOption };
// };

// Export the handlers
export * as handlers from "./handlers/index";
export { orpcRouter };
