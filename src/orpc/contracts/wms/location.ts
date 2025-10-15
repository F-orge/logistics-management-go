import { oc } from '@orpc/contract'
import { DeleteResult } from 'kysely'
import z from 'zod'
import { filterTransformer, paginateTransformer, sortTransformer } from '@/repositories/utils'
import {
  wmsLocationInsertSchema,
  wmsLocationSchema,
  wmsLocationUpdateSchema,
} from '@/schemas/wms/location'

export const paginateLocationContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsLocationSchema),
        sort: sortTransformer(wmsLocationSchema),
      }),
    ),
  )
  .output(z.array(wmsLocationSchema))

export const rangeLocationContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsLocationSchema),
        sort: sortTransformer(wmsLocationSchema),
      }),
    ),
  )
  .output(z.array(wmsLocationSchema))

export const inLocationContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsLocationSchema))

export const createLocationContract = oc.input(wmsLocationInsertSchema).output(wmsLocationSchema)

export const updateLocationContract = oc
  .input(z.object({ id: z.uuid(), value: wmsLocationUpdateSchema }))
  .output(wmsLocationSchema)

export const deleteLocationContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).transform((arg) => arg.numDeletedRows.toString()))
