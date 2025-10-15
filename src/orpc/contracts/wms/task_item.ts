import { oc } from '@orpc/contract'
import { DeleteResult } from 'kysely'
import z from 'zod'
import { filterTransformer, paginateTransformer, sortTransformer } from '@/repositories/utils'
import {
  wmsTaskItemInsertSchema,
  wmsTaskItemSchema,
  wmsTaskItemUpdateSchema,
} from '@/schemas/wms/task_item'

export const paginateTaskItemContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsTaskItemSchema),
        sort: sortTransformer(wmsTaskItemSchema),
      }),
    ),
  )
  .output(z.array(wmsTaskItemSchema))

export const rangeTaskItemContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsTaskItemSchema),
        sort: sortTransformer(wmsTaskItemSchema),
      }),
    ),
  )
  .output(z.array(wmsTaskItemSchema))

export const inTaskItemContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsTaskItemSchema))

export const createTaskItemContract = oc.input(wmsTaskItemInsertSchema).output(wmsTaskItemSchema)

export const updateTaskItemContract = oc
  .input(z.object({ id: z.uuid(), value: wmsTaskItemUpdateSchema }))
  .output(wmsTaskItemSchema)

export const deleteTaskItemContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).transform((arg) => arg.numDeletedRows.toString()))
