import { oc } from '@orpc/contract'
import { DeleteResult } from 'kysely'
import z from 'zod'
import { filterTransformer, paginateTransformer, sortTransformer } from '@/repositories/utils'
import {
  wmsReorderPointInsertSchema,
  wmsReorderPointSchema,
  wmsReorderPointUpdateSchema,
} from '@/schemas/wms/reorder_point'

export const paginateReorderPointContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsReorderPointSchema),
        sort: sortTransformer(wmsReorderPointSchema),
      }),
    ),
  )
  .output(z.array(wmsReorderPointSchema))

export const rangeReorderPointContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsReorderPointSchema),
        sort: sortTransformer(wmsReorderPointSchema),
      }),
    ),
  )
  .output(z.array(wmsReorderPointSchema))

export const inReorderPointContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsReorderPointSchema))

export const createReorderPointContract = oc
  .input(wmsReorderPointInsertSchema)
  .output(wmsReorderPointSchema)

export const updateReorderPointContract = oc
  .input(z.object({ id: z.uuid(), value: wmsReorderPointUpdateSchema }))
  .output(wmsReorderPointSchema)

export const deleteReorderPointContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).transform((arg) => arg.numDeletedRows.toString()))
