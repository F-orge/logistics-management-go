import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsOutboundShipmentItemRepository } from '@/repositories/wms/outboundShipmentItems';
import {
  wmsOutboundShipmentItemInsertSchema,
  wmsOutboundShipmentItemSchema,
  wmsOutboundShipmentItemUpdateSchema,
} from '@/schemas/wms/outbound_shipment_item';

export const selectWmsOutboundShipmentItems = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsOutboundShipmentItemSchema))
  .handler(async ({ data }) => {
    const outboundShipmentItemRepository =
      new WmsOutboundShipmentItemRepository(kyselyDb);

    const result = await outboundShipmentItemRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<
          DB,
          'wms.outboundShipmentItems'
        >,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.outboundShipmentItems', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsOutboundShipmentItemSchema.array().parseAsync(result);
  });

export const createWmsOutboundShipmentItem = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsOutboundShipmentItemInsertSchema)
  .handler(async ({ data }) => {
    const outboundShipmentItemRepository =
      new WmsOutboundShipmentItemRepository(kyselyDb);

    const result = await outboundShipmentItemRepository
      .create(data)
      .executeTakeFirst();

    return wmsOutboundShipmentItemSchema.parseAsync(result);
  });

export const updateWmsOutboundShipmentItem = createServerFn({
  method: 'POST',
})
  .inputValidator(
    z.object({ id: z.uuid(), value: wmsOutboundShipmentItemUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const outboundShipmentItemRepository =
      new WmsOutboundShipmentItemRepository(kyselyDb);

    const result = await outboundShipmentItemRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsOutboundShipmentItemSchema.parseAsync(result);
  });

export const removeWmsOutboundShipmentItem = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const outboundShipmentItemRepository =
      new WmsOutboundShipmentItemRepository(kyselyDb);

    const result = await outboundShipmentItemRepository
      .delete(data.id)
      .executeTakeFirst();

    return result;
  });
