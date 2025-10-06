import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsReturnRepository } from '@/repositories/wms/returns';
import {
  wmsReturnInsertSchema,
  wmsReturnSchema,
  wmsReturnUpdateSchema,
} from '@/schemas/wms/return';

export const selectWmsReturns = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsReturnSchema))
  .handler(async ({ data }) => {
    const returnRepository = new WmsReturnRepository(kyselyDb);

    const result = await returnRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.returns'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.returns', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsReturnSchema.array().parseAsync(result);
  });

export const createWmsReturn = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsReturnInsertSchema)
  .handler(async ({ data }) => {
    const returnRepository = new WmsReturnRepository(kyselyDb);

    const result = await returnRepository.create(data).executeTakeFirst();

    return wmsReturnSchema.parseAsync(result);
  });

export const updateWmsReturn = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsReturnUpdateSchema }))
  .handler(async ({ data }) => {
    const returnRepository = new WmsReturnRepository(kyselyDb);

    const result = await returnRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsReturnSchema.parseAsync(result);
  });

export const removeWmsReturn = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const returnRepository = new WmsReturnRepository(kyselyDb);

    const result = await returnRepository.delete(data.id).executeTakeFirst();

    return result;
  });
