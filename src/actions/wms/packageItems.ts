import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsPackageItemRepository } from '@/repositories/wms/packageItems';
import {
  wmsPackageItemInsertSchema,
  wmsPackageItemSchema,
  wmsPackageItemUpdateSchema,
} from '@/schemas/wms/package_item';

export const selectWmsPackageItems = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsPackageItemSchema))
  .handler(async ({ data }) => {
    const packageItemRepository = new WmsPackageItemRepository(kyselyDb);

    const result = await packageItemRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.packageItems'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.packageItems', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsPackageItemSchema.array().parseAsync(result);
  });

export const createWmsPackageItem = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsPackageItemInsertSchema)
  .handler(async ({ data }) => {
    const packageItemRepository = new WmsPackageItemRepository(kyselyDb);

    const result = await packageItemRepository.create(data).executeTakeFirst();

    return wmsPackageItemSchema.parseAsync(result);
  });

export const updateWmsPackageItem = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsPackageItemUpdateSchema }))
  .handler(async ({ data }) => {
    const packageItemRepository = new WmsPackageItemRepository(kyselyDb);

    const result = await packageItemRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsPackageItemSchema.parseAsync(result);
  });

export const removeWmsPackageItem = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const packageItemRepository = new WmsPackageItemRepository(kyselyDb);

    const result = await packageItemRepository.delete(data.id).executeTakeFirst();

    return result;
  });
