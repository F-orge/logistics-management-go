import { implement } from "@orpc/server";
import type { ORPCContext } from "@/index";
import { nonEmpty } from "@packages/db/utils";
import * as contracts from "@packages/rpc/contracts/wms/inbound_shipment";
import {
  InboundShipmentItemRepository,
  InboundShipmentRepository,
  ProductRepository,
  WarehouseRepository,
} from "@packages/db/repositories/wms";
import { CompanyRepository } from "@packages/db/repositories/crm";

async function getInboundShipment(context: ORPCContext, id: string) {
  const repo = InboundShipmentRepository.fns(context.kysely);
  const result = await repo.find(id);

  const [client, warehouse, items] = await Promise.all([
    result.clientId
      ? CompanyRepository.fns(context.kysely).find(result.clientId)
      : undefined,
    WarehouseRepository.fns(context.kysely).find(result.warehouseId),
    InboundShipmentItemRepository.fns(context.kysely).paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: "inboundShipmentId", operator: "in", value: [id] }],
    }),
  ]);

  const products = await ProductRepository.fns(context.kysely).any(
    items.map((i) => i.productId)
  );

  return {
    ...result,
    client,
    warehouse: warehouse!,
    items: items.map((item) => ({
      ...item,
      product: products.find((p) => p.id === item.productId)!,
    })),
  };
}

export const PaginateInboundShipment = implement(
  contracts.PaginateInboundShipmentContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InboundShipmentRepository.fns(context.kysely);
    const result = await repo.paginate(input);
    if (result.length === 0) {
      return [];
    }

    const [clients, warehouses, items] = await Promise.all([
      CompanyRepository.fns(context.kysely).any(
        result.map((r) => r.clientId).filter(nonEmpty)
      ),
      WarehouseRepository.fns(context.kysely).any(
        result.map((r) => r.warehouseId)
      ),
      InboundShipmentItemRepository.fns(context.kysely).paginate({
        page: 1,
        perPage: 1000,
        filters: [
          {
            column: "inboundShipmentId",
            operator: "in",
            value: result.map((r) => r.id),
          },
        ],
      }),
    ]);

    const products = await ProductRepository.fns(context.kysely).any(
      items.map((i) => i.productId)
    );

    return result.map((row) => ({
      ...row,
      client: clients.find((c) => c.id === row.clientId),
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      items: items
        .filter((i) => i.inboundShipmentId === row.id)
        .map((item) => ({
          ...item,
          product: products.find((p) => p.id === item.productId)!,
        })),
    }));
  });

export const RangeInboundShipment = implement(
  contracts.RangeInboundShipmentContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InboundShipmentRepository.fns(context.kysely);
    const result = await repo.range(input);
    if (result.length === 0) {
      return [];
    }

    const [clients, warehouses, items] = await Promise.all([
      CompanyRepository.fns(context.kysely).any(
        result.map((r) => r.clientId).filter(nonEmpty)
      ),
      WarehouseRepository.fns(context.kysely).any(
        result.map((r) => r.warehouseId)
      ),
      InboundShipmentItemRepository.fns(context.kysely).paginate({
        page: 1,
        perPage: 1000,
        filters: [
          {
            column: "inboundShipmentId",
            operator: "in",
            value: result.map((r) => r.id),
          },
        ],
      }),
    ]);

    const products = await ProductRepository.fns(context.kysely).any(
      items.map((i) => i.productId)
    );

    return result.map((row) => ({
      ...row,
      client: clients.find((c) => c.id === row.clientId),
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      items: items
        .filter((i) => i.inboundShipmentId === row.id)
        .map((item) => ({
          ...item,
          product: products.find((p) => p.id === item.productId)!,
        })),
    }));
  });

export const AnyInboundShipment = implement(
  contracts.AnyInboundShipmentContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InboundShipmentRepository.fns(context.kysely);
    const result = await repo.any(input);
    if (result.length === 0) {
      return [];
    }

    const [clients, warehouses, items] = await Promise.all([
      CompanyRepository.fns(context.kysely).any(
        result.map((r) => r.clientId).filter(nonEmpty)
      ),
      WarehouseRepository.fns(context.kysely).any(
        result.map((r) => r.warehouseId)
      ),
      InboundShipmentItemRepository.fns(context.kysely).paginate({
        page: 1,
        perPage: 1000,
        filters: [
          {
            column: "inboundShipmentId",
            operator: "in",
            value: result.map((r) => r.id),
          },
        ],
      }),
    ]);

    const products = await ProductRepository.fns(context.kysely).any(
      items.map((i) => i.productId)
    );

    return result.map((row) => ({
      ...row,
      client: clients.find((c) => c.id === row.clientId),
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      items: items
        .filter((i) => i.inboundShipmentId === row.id)
        .map((item) => ({
          ...item,
          product: products.find((p) => p.id === item.productId)!,
        })),
    }));
  });

export const InsertInboundShipment = implement(
  contracts.InsertInboundShipmentContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const { items, ...data } = input;
    const repo = InboundShipmentRepository.fns(context.kysely);
    const result = await repo.insert(data);

    await InboundShipmentItemRepository.fns(context.kysely).insertMany(
      items.map((item) => ({ ...item, inboundShipmentId: result.id }))
    );

    return getInboundShipment(context, result.id);
  });

export const InsertManyInboundShipment = implement(
  contracts.InsertManyInboundShipmentContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InboundShipmentRepository.fns(context.kysely);
    const result = await repo.insertMany(input.map(({ items, ...d }) => d));
    const allItems = input.flatMap((d, i) =>
      d.items.map((item) => ({ ...item, inboundShipmentId: result[i].id }))
    );
    await InboundShipmentItemRepository.fns(context.kysely).insertMany(
      allItems
    );

    return Promise.all(result.map((r) => getInboundShipment(context, r.id)));
  });

export const UpdateInboundShipment = implement(
  contracts.UpdateInboundShipmentContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InboundShipmentRepository.fns(context.kysely);
    await repo.update(input.id, input.value);
    return getInboundShipment(context, input.id);
  });

export const RemoveInboundShipment = implement(
  contracts.RemoveInboundShipmentContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InboundShipmentRepository.fns(context.kysely);
    return await repo.remove(input);
  });

export const InsertInboundShipmentItem = implement(
  contracts.InsertInboundShipmentItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InboundShipmentItemRepository.fns(context.kysely);
    const newItem = await repo.insert(input);
    return getInboundShipment(context, newItem.inboundShipmentId);
  });

export const InsertManyInboundShipmentItem = implement(
  contracts.InsertManyInboundShipmentItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InboundShipmentItemRepository.fns(context.kysely);
    await repo.insertMany(input);
    return await Promise.all(
      input.map((row) => getInboundShipment(context, row.inboundShipmentId))
    );
  });

export const UpdateInboundShipmentItem = implement(
  contracts.UpdateInboundShipmentItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InboundShipmentItemRepository.fns(context.kysely);
    const updatedItem = await repo.update(input.id, input.value);
    return getInboundShipment(context, updatedItem.inboundShipmentId);
  });

export const RemoveInboundShipmentItem = implement(
  contracts.RemoveInboundShipmentItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InboundShipmentItemRepository.fns(context.kysely);
    const removed = await repo.remove(input);
    return removed;
  });
