import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { orpcClient } from "@/lib/orpc";
import type {
  ORPCServerInputs,
  ORPCServerOutputs,
} from "@packages/rpc/src/index";

export const orpcQueryOption = <
  Schema extends keyof typeof orpcClient,
  Table extends keyof (typeof orpcClient)[Schema]
>(
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
    queryFn: async () => (orpcClient[schema][table] as any)(options),
  });

export const orpcMutationOption = <
  Schema extends keyof typeof orpcClient,
  Table extends keyof (typeof orpcClient)[Schema]
>(
  schema: Schema,
  table: Table
) =>
  mutationOptions<
    ORPCServerOutputs[Schema][Table],
    void,
    ORPCServerInputs[Schema][Table]
  >({
    mutationKey: [schema, table],
    mutationFn: (value) => (orpcClient[schema][table] as any)(value),
    onSuccess: (_data, _t, _s, w) => {
      w.client.invalidateQueries({ queryKey: [schema, table] });
    },
  });
