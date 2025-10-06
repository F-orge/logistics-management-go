import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { DmsDeliveryRouteRepository } from '@/repositories/dms/deliveryRoutes';
import {
  dmsDeliveryRouteInsertSchema,
  dmsDeliveryRouteSchema,
  dmsDeliveryRouteUpdateSchema,
} from '@/schemas/dms/delivery_route';

export const selectDmsDeliveryRoute = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(dmsDeliveryRouteSchema))
  .handler(async ({ data }) => {
    const repository = new DmsDeliveryRouteRepository(kyselyDb);

    const result = await repository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'dms.deliveryRoutes'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'dms.deliveryRoutes', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return dmsDeliveryRouteSchema.array().parseAsync(result);
  });

export const createDmsDeliveryRoute = createServerFn({
  method: 'POST',
})
  .inputValidator(dmsDeliveryRouteInsertSchema)
  .handler(async ({ data }) => {
    const repository = new DmsDeliveryRouteRepository(kyselyDb);

    const result = await repository.create(data).executeTakeFirst();

    return dmsDeliveryRouteSchema.parseAsync(result);
  });

export const updateDmsDeliveryRoute = createServerFn({
  method: 'POST',
})
  .inputValidator(
    z.object({ id: z.uuid(), value: dmsDeliveryRouteUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const repository = new DmsDeliveryRouteRepository(kyselyDb);

    const result = await repository
      .update(data.id, data.value)
      .executeTakeFirst();

    return dmsDeliveryRouteSchema.parseAsync(result);
  });

export const removeDmsDeliveryRoute = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repository = new DmsDeliveryRouteRepository(kyselyDb);

    const result = await repository.delete(data.id).executeTakeFirst();

    return result;
  });
