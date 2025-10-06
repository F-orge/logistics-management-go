import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsShipmentLegEventRepository } from '@/repositories/tms/shipmentLegEvents';
import {
  tmsShipmentLegEventInsertSchema,
  tmsShipmentLegEventSchema,
  tmsShipmentLegEventUpdateSchema,
} from '@/schemas/tms/shipment_leg_event';

export const selectTmsShipmentLegEvent = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsShipmentLegEventSchema))
  .handler(async ({ data }) => {
    const repo = new TmsShipmentLegEventRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'tms.shipmentLegEvents'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.shipmentLegEvents', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsShipmentLegEventSchema.array().parseAsync(result);
  });

export const createTmsShipmentLegEvent = createServerFn({ method: 'POST' })
  .inputValidator(tmsShipmentLegEventInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsShipmentLegEventRepository(kyselyDb);

    const result = await repo.create(data).executeTakeFirst();

    return tmsShipmentLegEventSchema.parseAsync(result);
  });

export const updateTmsShipmentLegEvent = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({ id: z.uuid(), value: tmsShipmentLegEventUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const repo = new TmsShipmentLegEventRepository(kyselyDb);

    const result = await repo.update(data.id, data.value).executeTakeFirst();

    return tmsShipmentLegEventSchema.parseAsync(result);
  });

export const removeTmsShipmentLegEvent = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsShipmentLegEventRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
