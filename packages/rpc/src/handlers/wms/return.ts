import { implement } from "@orpc/server";
import type { ORPCContext } from "@/index";
import { nonEmpty } from "@packages/db/utils";
import * as contracts from "@packages/rpc/contracts/wms/return";
import {
  ProductRepository,
  ReturnItemRepository,
  ReturnRepository,
  SalesOrderRepository,
} from "@packages/db/repositories/wms";
import { CompanyRepository } from "@packages/db/repositories/crm";

async function getReturn(context: ORPCContext, id: string) {
  const repo = ReturnRepository.fns(context.kysely);
  const result = await repo.find(id);

  const [client, salesOrder, items] = await Promise.all([
    CompanyRepository.fns(context.kysely).find(result.clientId),
    result.salesOrderId
      ? SalesOrderRepository.fns(context.kysely).find(result.salesOrderId)
      : undefined,
    ReturnItemRepository.fns(context.kysely).paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: "returnId", operator: "in", value: [id] }],
    }),
  ]);

  const productIds = items.map((i) => i.productId);
  const products = await ProductRepository.fns(context.kysely).any(productIds);
  const productMap = new Map(products.map((p) => [p.id, p]));

  return {
    ...result,
    client: client!,
    salesOrder,
    items: items.map((item) => ({
      ...item,
      product: productMap.get(item.productId)!,
    })),
  };
}

export const PaginateReturn = implement(contracts.PaginateReturnContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReturnRepository.fns(context.kysely);
    const result = await repo.paginate(input);
    if (result.length === 0) {
      return [];
    }

    return Promise.all(result.map((r) => getReturn(context, r.id)));
  });

export const RangeReturn = implement(contracts.RangeReturnContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReturnRepository.fns(context.kysely);
    const result = await repo.range(input);
    if (result.length === 0) {
      return [];
    }

    return Promise.all(result.map((r) => getReturn(context, r.id)));
  });

export const AnyReturn = implement(contracts.AnyReturnContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReturnRepository.fns(context.kysely);
    const result = await repo.any(input);
    if (result.length === 0) {
      return [];
    }

    return Promise.all(result.map((r) => getReturn(context, r.id)));
  });

export const InsertReturn = implement(contracts.InsertReturnContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const { items, ...data } = input;
    const repo = ReturnRepository.fns(context.kysely);
    const result = await repo.insert(data);

    await ReturnItemRepository.fns(context.kysely).insertMany(
      items.map((item) => ({ ...item, returnId: result.id }))
    );

    return getReturn(context, result.id);
  });

export const InsertManyReturn = implement(contracts.InsertManyReturnContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReturnRepository.fns(context.kysely);
    const result = await repo.insertMany(input.map(({ items, ...d }) => d));
    const allItems = input.flatMap((d, i) =>
      d.items.map((item) => ({ ...item, returnId: result[i].id }))
    );
    await ReturnItemRepository.fns(context.kysely).insertMany(allItems);

    return Promise.all(result.map((r) => getReturn(context, r.id)));
  });

export const UpdateReturn = implement(contracts.UpdateReturnContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReturnRepository.fns(context.kysely);
    await repo.update(input.id, input.value);
    return getReturn(context, input.id);
  });

export const RemoveReturn = implement(contracts.RemoveReturnContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReturnRepository.fns(context.kysely);
    return await repo.remove(input);
  });

export const InsertReturnItem = implement(contracts.InsertReturnItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReturnItemRepository.fns(context.kysely);
    const newItem = await repo.insert(input);
    return getReturn(context, newItem.returnId);
  });

export const InsertManyReturnItem = implement(
  contracts.InsertManyReturnItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReturnItemRepository.fns(context.kysely);
    await repo.insertMany(input);
    return await Promise.all(
      input.map((row) => getReturn(context, row.returnId))
    );
  });

export const UpdateReturnItem = implement(contracts.UpdateReturnItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReturnItemRepository.fns(context.kysely);
    const updatedItem = await repo.update(input.id, input.value);
    return getReturn(context, updatedItem.returnId);
  });

export const RemoveReturnItem = implement(contracts.RemoveReturnItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReturnItemRepository.fns(context.kysely);
    const removed = await repo.remove(input);
    return removed;
  });
