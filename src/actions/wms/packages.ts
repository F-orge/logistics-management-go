import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsPackageRepository } from '@/repositories/wms/packages';
import {
  wmsPackageInsertSchema,
  wmsPackageSchema,
  wmsPackageUpdateSchema,
} from '@/schemas/wms/package';

export const selectWmsPackages = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsPackageSchema))
  .handler(async ({ data }) => {
    const packageRepository = new WmsPackageRepository(kyselyDb);

    const result = await packageRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.packages'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.packages', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsPackageSchema.array().parseAsync(result);
  });

export const createWmsPackage = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsPackageInsertSchema)
  .handler(async ({ data }) => {
    const packageRepository = new WmsPackageRepository(kyselyDb);

    const result = await packageRepository.create(data).executeTakeFirst();

    return wmsPackageSchema.parseAsync(result);
  });

export const updateWmsPackage = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsPackageUpdateSchema }))
  .handler(async ({ data }) => {
    const packageRepository = new WmsPackageRepository(kyselyDb);

    const result = await packageRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsPackageSchema.parseAsync(result);
  });

export const removeWmsPackage = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const packageRepository = new WmsPackageRepository(kyselyDb);

    const result = await packageRepository.delete(data.id).executeTakeFirst();

    return result;
  });
