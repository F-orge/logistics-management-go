import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsTripStopRepository } from '@/repositories/tms/tripStops';
import {
  tmsTripStopInsertSchema,
  tmsTripStopSchema,
  tmsTripStopUpdateSchema,
} from '@/schemas/tms/trip_stop';

export const selectTmsTripStop = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsTripStopSchema))
  .handler(async ({ data }) => {
    const repo = new TmsTripStopRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'tms.tripStops'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.tripStops', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsTripStopSchema.array().parseAsync(result);
  });

export const createTmsTripStop = createServerFn({ method: 'POST' })
  .inputValidator(tmsTripStopInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsTripStopRepository(kyselyDb);

    const result = await repo.create(data as any).executeTakeFirst();

    return tmsTripStopSchema.parseAsync(result);
  });

export const updateTmsTripStop = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: tmsTripStopUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new TmsTripStopRepository(kyselyDb);

    const result = await repo
      .update(data.id, data.value as any)
      .executeTakeFirst();

    return tmsTripStopSchema.parseAsync(result);
  });

export const removeTmsTripStop = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsTripStopRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
