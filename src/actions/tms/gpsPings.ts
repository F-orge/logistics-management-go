import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsGpsPingRepository } from '@/repositories/tms/gpsPings';
import {
  tmsGpsPingInsertSchema,
  tmsGpsPingSchema,
  tmsGpsPingUpdateSchema,
} from '@/schemas/tms/gps_ping';

export const selectTmsGpsPing = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsGpsPingSchema))
  .handler(async ({ data }) => {
    const repo = new TmsGpsPingRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'tms.gpsPings'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.gpsPings', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsGpsPingSchema.array().parseAsync(result);
  });

export const createTmsGpsPing = createServerFn({ method: 'POST' })
  .inputValidator(tmsGpsPingInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsGpsPingRepository(kyselyDb);

    const result = await repo.create(data).executeTakeFirst();

    return tmsGpsPingSchema.parseAsync(result);
  });

export const updateTmsGpsPing = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: tmsGpsPingUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new TmsGpsPingRepository(kyselyDb);

    const result = await repo.update(data.id, data.value).executeTakeFirst();

    return tmsGpsPingSchema.parseAsync(result);
  });

export const removeTmsGpsPing = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsGpsPingRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
