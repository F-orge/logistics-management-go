import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsShipmentLegRepository } from '@/repositories/tms/shipmentLegs';
import {
  tmsShipmentLegInsertSchema,
  tmsShipmentLegSchema,
  tmsShipmentLegUpdateSchema,
} from '@/schemas/tms/shipment_leg';

export const selectTmsShipmentLeg = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsShipmentLegSchema))
  .handler(async ({ data }) => {
    const repo = new TmsShipmentLegRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'tms.shipmentLegs'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.shipmentLegs', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsShipmentLegSchema.array().parseAsync(result);
  });

export const createTmsShipmentLeg = createServerFn({ method: 'POST' })
  .inputValidator(tmsShipmentLegInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsShipmentLegRepository(kyselyDb);

    const result = await repo.create(data).executeTakeFirst();

    return tmsShipmentLegSchema.parseAsync(result);
  });

export const updateTmsShipmentLeg = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: tmsShipmentLegUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new TmsShipmentLegRepository(kyselyDb);

    const result = await repo.update(data.id, data.value).executeTakeFirst();

    return tmsShipmentLegSchema.parseAsync(result);
  });

export const removeTmsShipmentLeg = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsShipmentLegRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
