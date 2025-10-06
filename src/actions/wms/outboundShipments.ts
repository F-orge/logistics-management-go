import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsOutboundShipmentRepository } from '@/repositories/wms/outboundShipments';
import {
  wmsOutboundShipmentInsertSchema,
  wmsOutboundShipmentSchema,
  wmsOutboundShipmentUpdateSchema,
} from '@/schemas/wms/outbound_shipment';

export const selectWmsOutboundShipments = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsOutboundShipmentSchema))
  .handler(async ({ data }) => {
    const outboundShipmentRepository = new WmsOutboundShipmentRepository(kyselyDb);

    const result = await outboundShipmentRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.outboundShipments'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.outboundShipments', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsOutboundShipmentSchema.array().parseAsync(result);
  });

export const createWmsOutboundShipment = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsOutboundShipmentInsertSchema)
  .handler(async ({ data }) => {
    const outboundShipmentRepository = new WmsOutboundShipmentRepository(kyselyDb);

    const result = await outboundShipmentRepository.create(data).executeTakeFirst();

    return wmsOutboundShipmentSchema.parseAsync(result);
  });

export const updateWmsOutboundShipment = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsOutboundShipmentUpdateSchema }))
  .handler(async ({ data }) => {
    const outboundShipmentRepository = new WmsOutboundShipmentRepository(kyselyDb);

    const result = await outboundShipmentRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsOutboundShipmentSchema.parseAsync(result);
  });

export const removeWmsOutboundShipment = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const outboundShipmentRepository = new WmsOutboundShipmentRepository(kyselyDb);

    const result = await outboundShipmentRepository.delete(data.id).executeTakeFirst();

    return result;
  });
