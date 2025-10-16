import type { ColumnDef } from '@tanstack/react-table'
import { ZodString, type z, type ZodObject } from 'zod'
import { DataTableColumnHeader } from './column-header'

export function generateColumn<T extends ZodObject>(schema: T): ColumnDef<z.infer<T>>[] {
  const columns: ColumnDef<z.infer<T>>[] = []

  for (const key in schema.shape) {
    const schemaType = schema.shape[key]

    let column: ColumnDef<z.infer<T>> = {
      accessorKey: key,
      id: key,
      header: ({ column }) => <DataTableColumnHeader column={column} title={key} />,
    }

    columns.push(column)
  }

  return columns
}
