import { oc } from '@orpc/contract'
import { DeleteResult } from 'kysely'
import z from 'zod'
import { filterTransformer, paginateTransformer, sortTransformer } from '@/repositories/utils'
import { tmsDriverInsertSchema, tmsDriverSchema, tmsDriverUpdateSchema } from '@/schemas/tms/driver'

export const paginateDriverContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsDriverSchema),
        sort: sortTransformer(tmsDriverSchema),
      }),
    ),
  )
  .output(z.array(tmsDriverSchema))

export const rangeDriverContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsDriverSchema),
        sort: sortTransformer(tmsDriverSchema),
      }),
    ),
  )
  .output(z.array(tmsDriverSchema))

export const inDriverContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsDriverSchema))

export const createDriverContract = oc.input(tmsDriverInsertSchema).output(tmsDriverSchema)

export const updateDriverContract = oc
  .input(z.object({ id: z.uuid(), value: tmsDriverUpdateSchema }))
  .output(tmsDriverSchema)

export const deleteDriverContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).transform((arg) => arg.numDeletedRows.toString()))
