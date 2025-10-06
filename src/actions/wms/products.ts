import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsProductRepository } from '@/repositories/wms/products';
import {
  wmsProductInsertSchema,
  wmsProductSchema,
  wmsProductUpdateSchema,
} from '@/schemas/wms/product';

export const selectWmsProducts = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsProductSchema))
  .handler(async ({ data }) => {
    const productRepository = new WmsProductRepository(kyselyDb);

    const result = await productRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.products'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.products', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsProductSchema.array().parseAsync(result);
  });

export const createWmsProduct = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsProductInsertSchema)
  .handler(async ({ data }) => {
    const productRepository = new WmsProductRepository(kyselyDb);

    const result = await productRepository.create(data).executeTakeFirst();

    return wmsProductSchema.parseAsync(result);
  });

export const updateWmsProduct = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsProductUpdateSchema }))
  .handler(async ({ data }) => {
    const productRepository = new WmsProductRepository(kyselyDb);

    const result = await productRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsProductSchema.parseAsync(result);
  });

export const removeWmsProduct = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const productRepository = new WmsProductRepository(kyselyDb);

    const result = await productRepository.delete(data.id).executeTakeFirst();

    return result;
  });
