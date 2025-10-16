import * as z from "zod"

export interface TableColumnRegistryConfig {
  onRowEdit: (value:unknown) => Promise<unknown> | unknown
}

export const DataTableRegistry = z.registry()