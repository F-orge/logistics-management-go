import { implement } from "@orpc/server";
import type { ORPCContext } from "@/index";
import { nonEmpty } from "@packages/db/utils";
import * as contracts from "@packages/rpc/contracts/wms/outbound_shipment";
import {
  OutboundShipmentItemRepository,
  OutboundShipmentRepository,
  SalesOrderRepository,
  WarehouseRepository,
} from "@packages/db/repositories/wms";

async function getOutboundShipment(context: ORPCContext, id: string) {
  const repo = OutboundShipmentRepository.fns(context.kysely);
  const result = await repo.find(id);

  const [salesOrder, warehouse, items] = await Promise.all([
    SalesOrderRepository.fns(context.kysely).find(result.salesOrderId),
    WarehouseRepository.fns(context.kysely).find(result.warehouseId),
    OutboundShipmentItemRepository.fns(context.kysely).paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: "outboundShipmentId", operator: "in", value: [id] }],
    }),
  ]);

  return {
    ...result,
    salesOrder: salesOrder!,
    warehouse: warehouse!,
    items,
  };
}

export const PaginateOutboundShipment = implement(
  contracts.PaginateOutboundShipmentContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = OutboundShipmentRepository.fns(context.kysely);
    const result = await repo.paginate(input);
    if (result.length === 0) {
      return [];
    }

    const [salesOrders, warehouses, items] = await Promise.all([
      SalesOrderRepository.fns(context.kysely).any(
        result.map((r) => r.salesOrderId)
      ),
      WarehouseRepository.fns(context.kysely).any(
        result.map((r) => r.warehouseId)
      ),
      OutboundShipmentItemRepository.fns(context.kysely).paginate({
        page: 1,
        perPage: 1000,
        filters: [
          {
            column: "outboundShipmentId",
            operator: "in",
            value: result.map((r) => r.id),
          },
        ],
      }),
    ]);

    return result.map((row) => ({
      ...row,
      salesOrder: salesOrders.find((s) => s.id === row.salesOrderId)!,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      items: items.filter((i) => i.outboundShipmentId === row.id),
    }));
  });

export const RangeOutboundShipment = implement(
  contracts.RangeOutboundShipmentContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = OutboundShipmentRepository.fns(context.kysely);
    const result = await repo.range(input);
    if (result.length === 0) {
      return [];
    }

    const [salesOrders, warehouses, items] = await Promise.all([
      SalesOrderRepository.fns(context.kysely).any(
        result.map((r) => r.salesOrderId)
      ),
      WarehouseRepository.fns(context.kysely).any(
        result.map((r) => r.warehouseId)
      ),
      OutboundShipmentItemRepository.fns(context.kysely).paginate({
        page: 1,
        perPage: 1000,
        filters: [
          {
            column: "outboundShipmentId",
            operator: "in",
            value: result.map((r) => r.id),
          },
        ],
      }),
    ]);

    return result.map((row) => ({
      ...row,
      salesOrder: salesOrders.find((s) => s.id === row.salesOrderId)!,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      items: items.filter((i) => i.outboundShipmentId === row.id),
    }));
  });

export const AnyOutboundShipment = implement(
  contracts.AnyOutboundShipmentContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = OutboundShipmentRepository.fns(context.kysely);
    const result = await repo.any(input);
    if (result.length === 0) {
      return [];
    }

    const [salesOrders, warehouses, items] = await Promise.all([
      SalesOrderRepository.fns(context.kysely).any(
        result.map((r) => r.salesOrderId)
      ),
      WarehouseRepository.fns(context.kysely).any(
        result.map((r) => r.warehouseId)
      ),
      OutboundShipmentItemRepository.fns(context.kysely).paginate({
        page: 1,
        perPage: 1000,
        filters: [
          {
            column: "outboundShipmentId",
            operator: "in",
            value: result.map((r) => r.id),
          },
        ],
      }),
    ]);

    return result.map((row) => ({
      ...row,
      salesOrder: salesOrders.find((s) => s.id === row.salesOrderId)!,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      items: items.filter((i) => i.outboundShipmentId === row.id),
    }));
  });

export const InsertOutboundShipment = implement(
  contracts.InsertOutboundShipmentContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const { items, ...data } = input;
    const repo = OutboundShipmentRepository.fns(context.kysely);
    const result = await repo.insert(data);

    await OutboundShipmentItemRepository.fns(context.kysely).insertMany(
      items.map((item) => ({ ...item, outboundShipmentId: result.id }))
    );

    return getOutboundShipment(context, result.id);
  });

export const InsertManyOutboundShipment = implement(
  contracts.InsertManyOutboundShipmentContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = OutboundShipmentRepository.fns(context.kysely);
    const result = await repo.insertMany(input.map(({ items, ...d }) => d));
    const allItems = input.flatMap((d, i) =>
      d.items.map((item) => ({ ...item, outboundShipmentId: result[i].id }))
    );
    await OutboundShipmentItemRepository.fns(context.kysely).insertMany(
      allItems
    );

    return Promise.all(result.map((r) => getOutboundShipment(context, r.id)));
  });

export const UpdateOutboundShipment = implement(
  contracts.UpdateOutboundShipmentContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = OutboundShipmentRepository.fns(context.kysely);
    await repo.update(input.id, input.value);
    return getOutboundShipment(context, input.id);
  });

export const RemoveOutboundShipment = implement(
  contracts.RemoveOutboundShipmentContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = OutboundShipmentRepository.fns(context.kysely);
    return await repo.remove(input);
  });

export const InsertOutboundShipmentItem = implement(
  contracts.InsertOutboundShipmentItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = OutboundShipmentItemRepository.fns(context.kysely);
    const newItem = await repo.insert(input);
    return getOutboundShipment(context, newItem.outboundShipmentId);
  });

export const InsertManyOutboundShipmentItem = implement(
  contracts.InsertManyOutboundShipmentItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = OutboundShipmentItemRepository.fns(context.kysely);

    await repo.insertMany(input);

    return await Promise.all(
      input.map((row) => getOutboundShipment(context, row.outboundShipmentId))
    );
  });

export const UpdateOutboundShipmentItem = implement(
  contracts.UpdateOutboundShipmentItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = OutboundShipmentItemRepository.fns(context.kysely);
    const updatedItem = await repo.update(input.id, input.value);
    return getOutboundShipment(context, updatedItem.outboundShipmentId);
  });

export const RemoveOutboundShipmentItem = implement(
  contracts.RemoveOutboundShipmentItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = OutboundShipmentItemRepository.fns(context.kysely);
    const removed = await repo.remove(input);
    return removed;
  });
