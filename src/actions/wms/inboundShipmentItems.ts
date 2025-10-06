import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsInboundShipmentItemRepository } from '@/repositories/wms/inboundShipmentItems';
import {
  wmsInboundShipmentItemInsertSchema,
  wmsInboundShipmentItemSchema,
  wmsInboundShipmentItemUpdateSchema,
} from '@/schemas/wms/inbound_shipment_item';

export const selectWmsInboundShipmentItems = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsInboundShipmentItemSchema))
  .handler(async ({ data }) => {
    const inboundShipmentItemRepository = new WmsInboundShipmentItemRepository(kyselyDb);

    const result = await inboundShipmentItemRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.inboundShipmentItems'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.inboundShipmentItems', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsInboundShipmentItemSchema.array().parseAsync(result);
  });

export const createWmsInboundShipmentItem = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsInboundShipmentItemInsertSchema)
  .handler(async ({ data }) => {
    const inboundShipmentItemRepository = new WmsInboundShipmentItemRepository(kyselyDb);

    const result = await inboundShipmentItemRepository.create(data).executeTakeFirst();

    return wmsInboundShipmentItemSchema.parseAsync(result);
  });

export const updateWmsInboundShipmentItem = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsInboundShipmentItemUpdateSchema }))
  .handler(async ({ data }) => {
    const inboundShipmentItemRepository = new WmsInboundShipmentItemRepository(kyselyDb);

    const result = await inboundShipmentItemRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsInboundShipmentItemSchema.parseAsync(result);
  });

export const removeWmsInboundShipmentItem = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const inboundShipmentItemRepository = new WmsInboundShipmentItemRepository(kyselyDb);

    const result = await inboundShipmentItemRepository.delete(data.id).executeTakeFirst();

    return result;
  });
