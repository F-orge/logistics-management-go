import type {ColumnDef} from "@tanstack/react-table"
import type { z, ZodObject } from "zod"

export function generateColumn<T extends ZodObject>(schema:T):ColumnDef<z.infer<T>>[] {
  
  const columns:ColumnDef<z.infer<T>>[] = []

  for (const key in schema.shape) {
      const column:ColumnDef<z.infer<T>> = {accessorKey:key}

      const schemaType = schema.shape[key]
      
      columns.push(column)
  }

  return columns
}