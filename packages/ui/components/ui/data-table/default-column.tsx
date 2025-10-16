import type { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { ZodNumber, ZodString } from 'zod'

export const DefaultColumn: Partial<ColumnDef<any>> = {
  cell: ({ getValue, row: { index, original }, column: { id }, table }) => {
    const initialValue = getValue()

    const type = () => table.options.meta?.schema?.shape[id]

    const [value, setValue] = React.useState(initialValue)

    const onBlur = () => {
      if (type() instanceof ZodString) {
        table.options.meta?.updateData?.(original.id as string, id, type().parse(value))
      }
    }

    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return (
      <input value={value as string} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />
    )
  },
}
