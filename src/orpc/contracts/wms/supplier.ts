import { oc } from '@orpc/contract'
import { DeleteResult } from 'kysely'
import z from 'zod'
import { filterTransformer, paginateTransformer, sortTransformer } from '@/repositories/utils'
import {
  wmsSupplierInsertSchema,
  wmsSupplierSchema,
  wmsSupplierUpdateSchema,
} from '@/schemas/wms/supplier'

export const paginateSupplierContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsSupplierSchema),
        sort: sortTransformer(wmsSupplierSchema),
      }),
    ),
  )
  .output(z.array(wmsSupplierSchema))

export const rangeSupplierContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsSupplierSchema),
        sort: sortTransformer(wmsSupplierSchema),
      }),
    ),
  )
  .output(z.array(wmsSupplierSchema))

export const inSupplierContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsSupplierSchema))

export const createSupplierContract = oc.input(wmsSupplierInsertSchema).output(wmsSupplierSchema)

export const updateSupplierContract = oc
  .input(z.object({ id: z.uuid(), value: wmsSupplierUpdateSchema }))
  .output(wmsSupplierSchema)

export const deleteSupplierContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).transform((arg) => arg.numDeletedRows.toString()))
