import { oc } from '@orpc/contract'
import { DeleteResult } from 'kysely'
import z from 'zod'
import { filterTransformer, paginateTransformer, sortTransformer } from '@/repositories/utils'
import {
  wmsPutawayRuleInsertSchema,
  wmsPutawayRuleSchema,
  wmsPutawayRuleUpdateSchema,
} from '@/schemas/wms/putaway_rule'

export const paginatePutawayRuleContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsPutawayRuleSchema),
        sort: sortTransformer(wmsPutawayRuleSchema),
      }),
    ),
  )
  .output(z.array(wmsPutawayRuleSchema))

export const rangePutawayRuleContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsPutawayRuleSchema),
        sort: sortTransformer(wmsPutawayRuleSchema),
      }),
    ),
  )
  .output(z.array(wmsPutawayRuleSchema))

export const inPutawayRuleContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsPutawayRuleSchema))

export const createPutawayRuleContract = oc
  .input(wmsPutawayRuleInsertSchema)
  .output(wmsPutawayRuleSchema)

export const updatePutawayRuleContract = oc
  .input(z.object({ id: z.uuid(), value: wmsPutawayRuleUpdateSchema }))
  .output(wmsPutawayRuleSchema)

export const deletePutawayRuleContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).transform((arg) => arg.numDeletedRows.toString()))
