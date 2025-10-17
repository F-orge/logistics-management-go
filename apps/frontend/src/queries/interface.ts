import { orpcClient } from "@/lib/orpc";
import { buildOrpcQueryOptions } from "@packages/rpc";

export const orpcQueryOption = buildOrpcQueryOptions(orpcClient);
