import * as z from "zod";
import type React from "react";
import type { ZodTypeDef } from "zod/v3";

export interface TableColumnRegistryConfig<Type = ZodTypeDef> {
  type?: Type;
  title?: React.ReactNode;
  sortable?: boolean;
  url?: string;
}

export const DataTableRegistry = z.registry<TableColumnRegistryConfig>();
