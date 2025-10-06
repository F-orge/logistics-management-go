import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsDriverRepository } from '@/repositories/tms/drivers';
import {
  tmsDriverInsertSchema,
  tmsDriverSchema,
  tmsDriverUpdateSchema,
} from '@/schemas/tms/driver';

export const selectTmsDriver = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsDriverSchema))
  .handler(async ({ data }) => {
    const repo = new TmsDriverRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'tms.drivers'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.drivers', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsDriverSchema.array().parseAsync(result);
  });

export const createTmsDriver = createServerFn({ method: 'POST' })
  .inputValidator(tmsDriverInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsDriverRepository(kyselyDb);

    const result = await repo.create(data).executeTakeFirst();

    return tmsDriverSchema.parseAsync(result);
  });

export const updateTmsDriver = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: tmsDriverUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new TmsDriverRepository(kyselyDb);

    const result = await repo.update(data.id, data.value).executeTakeFirst();

    return tmsDriverSchema.parseAsync(result);
  });

export const removeTmsDriver = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsDriverRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
