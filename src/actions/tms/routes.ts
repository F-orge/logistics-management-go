import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsRouteRepository } from '@/repositories/tms/routes';
import {
  tmsRouteInsertSchema,
  tmsRouteSchema,
  tmsRouteUpdateSchema,
} from '@/schemas/tms/route';

export const selectTmsRoute = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsRouteSchema))
  .handler(async ({ data }) => {
    const repo = new TmsRouteRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'tms.routes'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.routes', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsRouteSchema.array().parseAsync(result);
  });

export const createTmsRoute = createServerFn({ method: 'POST' })
  .inputValidator(tmsRouteInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsRouteRepository(kyselyDb);

    const result = await repo.create(data).executeTakeFirst();

    return tmsRouteSchema.parseAsync(result);
  });

export const updateTmsRoute = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: tmsRouteUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new TmsRouteRepository(kyselyDb);

    const result = await repo.update(data.id, data.value).executeTakeFirst();

    return tmsRouteSchema.parseAsync(result);
  });

export const removeTmsRoute = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsRouteRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
