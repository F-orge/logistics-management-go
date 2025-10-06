import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsSupplierRepository } from '@/repositories/wms/suppliers';
import {
  wmsSupplierInsertSchema,
  wmsSupplierSchema,
  wmsSupplierUpdateSchema,
} from '@/schemas/wms/supplier';

export const selectWmsSuppliers = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsSupplierSchema))
  .handler(async ({ data }) => {
    const supplierRepository = new WmsSupplierRepository(kyselyDb);

    const result = await supplierRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.suppliers'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.suppliers', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsSupplierSchema.array().parseAsync(result);
  });

export const createWmsSupplier = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsSupplierInsertSchema)
  .handler(async ({ data }) => {
    const supplierRepository = new WmsSupplierRepository(kyselyDb);

    const result = await supplierRepository.create(data).executeTakeFirst();

    return wmsSupplierSchema.parseAsync(result);
  });

export const updateWmsSupplier = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsSupplierUpdateSchema }))
  .handler(async ({ data }) => {
    const supplierRepository = new WmsSupplierRepository(kyselyDb);

    const result = await supplierRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsSupplierSchema.parseAsync(result);
  });

export const removeWmsSupplier = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const supplierRepository = new WmsSupplierRepository(kyselyDb);

    const result = await supplierRepository.delete(data.id).executeTakeFirst();

    return result;
  });