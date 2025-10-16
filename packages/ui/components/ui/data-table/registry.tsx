import * as z from "zod"

export interface TableColumnRegistryConfig {
  type?:'string' | 'object' | 'array'
  onRowEdit: (value:unknown) => Promise<unknown> | unknown
}

export const DataTableRegistry = z.registry<TableColumnRegistryConfig>()