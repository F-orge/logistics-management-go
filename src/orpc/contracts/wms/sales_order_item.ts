import { oc } from '@orpc/contract'
import { DeleteResult } from 'kysely'
import z from 'zod'
import { filterTransformer, paginateTransformer, sortTransformer } from '@/repositories/utils'
import {
  wmsSalesOrderItemInsertSchema,
  wmsSalesOrderItemSchema,
  wmsSalesOrderItemUpdateSchema,
} from '@/schemas/wms/sales_order_item'

export const paginateSalesOrderItemContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsSalesOrderItemSchema),
        sort: sortTransformer(wmsSalesOrderItemSchema),
      }),
    ),
  )
  .output(z.array(wmsSalesOrderItemSchema))

export const rangeSalesOrderItemContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsSalesOrderItemSchema),
        sort: sortTransformer(wmsSalesOrderItemSchema),
      }),
    ),
  )
  .output(z.array(wmsSalesOrderItemSchema))

export const inSalesOrderItemContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsSalesOrderItemSchema))

export const createSalesOrderItemContract = oc
  .input(wmsSalesOrderItemInsertSchema)
  .output(wmsSalesOrderItemSchema)

export const updateSalesOrderItemContract = oc
  .input(z.object({ id: z.uuid(), value: wmsSalesOrderItemUpdateSchema }))
  .output(wmsSalesOrderItemSchema)

export const deleteSalesOrderItemContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).transform((arg) => arg.numDeletedRows.toString()))
