import { oc } from '@orpc/contract'
import { DeleteResult } from 'kysely'
import z from 'zod'
import { filterTransformer, paginateTransformer, sortTransformer } from '@/repositories/utils'
import {
  dmsDeliveryTaskInsertSchema,
  dmsDeliveryTaskSchema,
  dmsDeliveryTaskUpdateSchema,
} from '@/schemas/dms/delivery_task'

export const paginateDeliveryTaskContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(dmsDeliveryTaskSchema),
        sort: sortTransformer(dmsDeliveryTaskSchema),
      }),
    ),
  )
  .output(z.array(dmsDeliveryTaskSchema))

export const rangeDeliveryTaskContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(dmsDeliveryTaskSchema),
        sort: sortTransformer(dmsDeliveryTaskSchema),
      }),
    ),
  )
  .output(z.array(dmsDeliveryTaskSchema))

export const inDeliveryTaskContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(dmsDeliveryTaskSchema))

export const createDeliveryTaskContract = oc
  .input(dmsDeliveryTaskInsertSchema)
  .output(dmsDeliveryTaskSchema)

export const updateDeliveryTaskContract = oc
  .input(z.object({ id: z.uuid(), value: dmsDeliveryTaskUpdateSchema }))
  .output(dmsDeliveryTaskSchema)

export const deleteDeliveryTaskContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).transform((arg) => arg.numDeletedRows.toString()))
