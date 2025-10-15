import { oc } from '@orpc/contract'
import { DeleteResult } from 'kysely'
import z from 'zod'
import { filterTransformer, paginateTransformer, sortTransformer } from '@/repositories/utils'
import { wmsTaskInsertSchema, wmsTaskSchema, wmsTaskUpdateSchema } from '@/schemas/wms/task'

export const paginateTaskContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsTaskSchema),
        sort: sortTransformer(wmsTaskSchema),
      }),
    ),
  )
  .output(z.array(wmsTaskSchema))

export const rangeTaskContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsTaskSchema),
        sort: sortTransformer(wmsTaskSchema),
      }),
    ),
  )
  .output(z.array(wmsTaskSchema))

export const inTaskContract = oc.input(z.array(z.uuid()).nonempty()).output(z.array(wmsTaskSchema))

export const createTaskContract = oc.input(wmsTaskInsertSchema).output(wmsTaskSchema)

export const updateTaskContract = oc
  .input(z.object({ id: z.uuid(), value: wmsTaskUpdateSchema }))
  .output(wmsTaskSchema)

export const deleteTaskContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).transform((arg) => arg.numDeletedRows.toString()))
