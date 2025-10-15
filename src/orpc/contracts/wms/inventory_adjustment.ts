import { oc } from '@orpc/contract'
import { DeleteResult } from 'kysely'
import z from 'zod'
import { filterTransformer, paginateTransformer, sortTransformer } from '@/repositories/utils'
import {
  wmsInventoryAdjustmentInsertSchema,
  wmsInventoryAdjustmentSchema,
  wmsInventoryAdjustmentUpdateSchema,
} from '@/schemas/wms/inventory_adjustment'

export const paginateInventoryAdjustmentContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsInventoryAdjustmentSchema),
        sort: sortTransformer(wmsInventoryAdjustmentSchema),
      }),
    ),
  )
  .output(z.array(wmsInventoryAdjustmentSchema))

export const rangeInventoryAdjustmentContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsInventoryAdjustmentSchema),
        sort: sortTransformer(wmsInventoryAdjustmentSchema),
      }),
    ),
  )
  .output(z.array(wmsInventoryAdjustmentSchema))

export const inInventoryAdjustmentContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsInventoryAdjustmentSchema))

export const createInventoryAdjustmentContract = oc
  .input(wmsInventoryAdjustmentInsertSchema)
  .output(wmsInventoryAdjustmentSchema)

export const updateInventoryAdjustmentContract = oc
  .input(z.object({ id: z.uuid(), value: wmsInventoryAdjustmentUpdateSchema }))
  .output(wmsInventoryAdjustmentSchema)

export const deleteInventoryAdjustmentContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).transform((arg) => arg.numDeletedRows.toString()))
