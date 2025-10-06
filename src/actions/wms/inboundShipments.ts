import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsInboundShipmentRepository } from '@/repositories/wms/inboundShipments';
import {
  wmsInboundShipmentInsertSchema,
  wmsInboundShipmentSchema,
  wmsInboundShipmentUpdateSchema,
} from '@/schemas/wms/inbound_shipment';

export const selectWmsInboundShipments = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsInboundShipmentSchema))
  .handler(async ({ data }) => {
    const inboundShipmentRepository = new WmsInboundShipmentRepository(
      kyselyDb,
    );

    const result = await inboundShipmentRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.inboundShipments'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.inboundShipments', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsInboundShipmentSchema.array().parseAsync(result);
  });

export const createWmsInboundShipment = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsInboundShipmentInsertSchema)
  .handler(async ({ data }) => {
    const inboundShipmentRepository = new WmsInboundShipmentRepository(
      kyselyDb,
    );

    const result = await inboundShipmentRepository
      .create(data)
      .executeTakeFirst();

    return wmsInboundShipmentSchema.parseAsync(result);
  });

export const updateWmsInboundShipment = createServerFn({
  method: 'POST',
})
  .inputValidator(
    z.object({ id: z.uuid(), value: wmsInboundShipmentUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const inboundShipmentRepository = new WmsInboundShipmentRepository(
      kyselyDb,
    );

    const result = await inboundShipmentRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsInboundShipmentSchema.parseAsync(result);
  });

export const removeWmsInboundShipment = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const inboundShipmentRepository = new WmsInboundShipmentRepository(
      kyselyDb,
    );

    const result = await inboundShipmentRepository
      .delete(data.id)
      .executeTakeFirst();

    return result;
  });
