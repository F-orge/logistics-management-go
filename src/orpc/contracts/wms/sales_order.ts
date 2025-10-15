import { oc } from '@orpc/contract'
import { DeleteResult } from 'kysely'
import z from 'zod'
import { filterTransformer, paginateTransformer, sortTransformer } from '@/repositories/utils'
import {
  wmsSalesOrderInsertSchema,
  wmsSalesOrderSchema,
  wmsSalesOrderUpdateSchema,
} from '@/schemas/wms/sales_order'

export const paginateSalesOrderContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsSalesOrderSchema),
        sort: sortTransformer(wmsSalesOrderSchema),
      }),
    ),
  )
  .output(z.array(wmsSalesOrderSchema))

export const rangeSalesOrderContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsSalesOrderSchema),
        sort: sortTransformer(wmsSalesOrderSchema),
      }),
    ),
  )
  .output(z.array(wmsSalesOrderSchema))

export const inSalesOrderContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsSalesOrderSchema))

export const createSalesOrderContract = oc
  .input(wmsSalesOrderInsertSchema)
  .output(wmsSalesOrderSchema)

export const updateSalesOrderContract = oc
  .input(z.object({ id: z.uuid(), value: wmsSalesOrderUpdateSchema }))
  .output(wmsSalesOrderSchema)

export const deleteSalesOrderContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).transform((arg) => arg.numDeletedRows.toString()))
