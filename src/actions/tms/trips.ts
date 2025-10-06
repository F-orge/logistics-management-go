import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsTripRepository } from '@/repositories/tms/trips';
import {
  tmsTripInsertSchema,
  tmsTripSchema,
  tmsTripUpdateSchema,
} from '@/schemas/tms/trip';

export const selectTmsTrip = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsTripSchema))
  .handler(async ({ data }) => {
    const repo = new TmsTripRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'tms.trips'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.trips', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsTripSchema.array().parseAsync(result);
  });

export const createTmsTrip = createServerFn({ method: 'POST' })
  .inputValidator(tmsTripInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsTripRepository(kyselyDb);

    const result = await repo.create(data).executeTakeFirst();

    return tmsTripSchema.parseAsync(result);
  });

export const updateTmsTrip = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: tmsTripUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new TmsTripRepository(kyselyDb);

    const result = await repo.update(data.id, data.value).executeTakeFirst();

    return tmsTripSchema.parseAsync(result);
  });

export const removeTmsTrip = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsTripRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
