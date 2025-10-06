import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsLocationRepository } from '@/repositories/wms/locations';
import {
  wmsLocationInsertSchema,
  wmsLocationSchema,
  wmsLocationUpdateSchema,
} from '@/schemas/wms/location';

export const selectWmsLocations = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsLocationSchema))
  .handler(async ({ data }) => {
    const locationRepository = new WmsLocationRepository(kyselyDb);

    const result = await locationRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.locations'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.locations', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsLocationSchema.array().parseAsync(result);
  });

export const createWmsLocation = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsLocationInsertSchema)
  .handler(async ({ data }) => {
    const locationRepository = new WmsLocationRepository(kyselyDb);

    const result = await locationRepository.create(data).executeTakeFirst();

    return wmsLocationSchema.parseAsync(result);
  });

export const updateWmsLocation = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsLocationUpdateSchema }))
  .handler(async ({ data }) => {
    const locationRepository = new WmsLocationRepository(kyselyDb);

    const result = await locationRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsLocationSchema.parseAsync(result);
  });

export const removeWmsLocation = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const locationRepository = new WmsLocationRepository(kyselyDb);

    const result = await locationRepository.delete(data.id).executeTakeFirst();

    return result;
  });
