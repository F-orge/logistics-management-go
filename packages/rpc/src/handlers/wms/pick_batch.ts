import { implement } from "@orpc/server";
import type { ORPCContext } from "@/index";
import { nonEmpty } from "@packages/db/utils";
import * as contracts from "@packages/rpc/contracts/wms/pick_batch";
import {
  PickBatchItemRepository,
  PickBatchRepository,
  WarehouseRepository,
} from "@packages/db/repositories/wms";
import { UserRepository } from "@packages/db/repositories/auth";

async function getPickBatch(context: ORPCContext, id: string) {
  const repo = PickBatchRepository.fns(context.kysely);
  const result = await repo.find(id);

  const [warehouse, assignedUser, items] = await Promise.all([
    WarehouseRepository.fns(context.kysely).find(result.warehouseId),
    result.assignedUserId
      ? UserRepository.fns(context.kysely).find(result.assignedUserId)
      : undefined,
    PickBatchItemRepository.fns(context.kysely).paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: "pickBatchId", operator: "in", value: [id] }],
    }),
  ]);

  return {
    ...result,
    warehouse: warehouse!,
    assignedUser,
    items: items,
  };
}

export const PaginatePickBatch = implement(contracts.PaginatePickBatchContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PickBatchRepository.fns(context.kysely);
    const result = await repo.paginate(input);

    if (result.length === 0) {
      return [];
    }

    const [warehouses, users, items] = await Promise.all([
      WarehouseRepository.fns(context.kysely).any(
        result.map((r) => r.warehouseId)
      ),
      UserRepository.fns(context.kysely).any(
        result.map((r) => r.assignedUserId).filter(nonEmpty)
      ),
      PickBatchItemRepository.fns(context.kysely).paginate({
        page: 1,
        perPage: 1000,
        filters: [
          {
            column: "pickBatchId",
            operator: "in",
            value: result.map((r) => r.id),
          },
        ],
      }),
    ]);

    return result.map((row) => ({
      ...row,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      assignedUser: users.find((u) => u.id === row.assignedUserId),
      items: items.filter((i) => i.pickBatchId === row.id),
    }));
  });

export const RangePickBatch = implement(contracts.RangePickBatchContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PickBatchRepository.fns(context.kysely);
    const result = await repo.range(input);
    if (result.length === 0) {
      return [];
    }

    const [warehouses, users, items] = await Promise.all([
      WarehouseRepository.fns(context.kysely).any(
        result.map((r) => r.warehouseId)
      ),
      UserRepository.fns(context.kysely).any(
        result.map((r) => r.assignedUserId).filter(nonEmpty)
      ),
      PickBatchItemRepository.fns(context.kysely).paginate({
        page: 1,
        perPage: 1000,
        filters: [
          {
            column: "pickBatchId",
            operator: "in",
            value: result.map((r) => r.id),
          },
        ],
      }),
    ]);

    return result.map((row) => ({
      ...row,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      assignedUser: users.find((u) => u.id === row.assignedUserId),
      items: items.filter((i) => i.pickBatchId === row.id),
    }));
  });

export const AnyPickBatch = implement(contracts.AnyPickBatchContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PickBatchRepository.fns(context.kysely);
    const result = await repo.any(input);
    if (result.length === 0) {
      return [];
    }

    const [warehouses, users, items] = await Promise.all([
      WarehouseRepository.fns(context.kysely).any(
        result.map((r) => r.warehouseId)
      ),
      UserRepository.fns(context.kysely).any(
        result.map((r) => r.assignedUserId).filter(nonEmpty)
      ),
      PickBatchItemRepository.fns(context.kysely).paginate({
        page: 1,
        perPage: 1000,
        filters: [
          {
            column: "pickBatchId",
            operator: "in",
            value: result.map((r) => r.id),
          },
        ],
      }),
    ]);

    return result.map((row) => ({
      ...row,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      assignedUser: users.find((u) => u.id === row.assignedUserId),
      items: items.filter((i) => i.pickBatchId === row.id),
    }));
  });

export const InsertPickBatch = implement(contracts.InsertPickBatchContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PickBatchRepository.fns(context.kysely);
    const result = await repo.insert(input);
    return getPickBatch(context, result.id);
  });

export const InsertManyPickBatch = implement(
  contracts.InsertManyPickBatchContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PickBatchRepository.fns(context.kysely);
    const result = await repo.insertMany(input);
    return Promise.all(result.map((r) => getPickBatch(context, r.id)));
  });

export const UpdatePickBatch = implement(contracts.UpdatePickBatchContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PickBatchRepository.fns(context.kysely);
    await repo.update(input.id, input.value);
    return getPickBatch(context, input.id);
  });

export const RemovePickBatch = implement(contracts.RemovePickBatchContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PickBatchRepository.fns(context.kysely);
    return await repo.remove(input);
  });

export const InsertPickBatchItem = implement(
  contracts.InsertPickBatchItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PickBatchItemRepository.fns(context.kysely);
    const newItem = await repo.insert(input);
    return getPickBatch(context, newItem.pickBatchId);
  });

export const InsertManyPickBatchItem = implement(
  contracts.InsertManyPickBatchItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PickBatchItemRepository.fns(context.kysely);
    const newItems = await repo.insertMany(input);
    return getPickBatch(context, newItems[0].pickBatchId);
  });

export const UpdatePickBatchItem = implement(
  contracts.UpdatePickBatchItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PickBatchItemRepository.fns(context.kysely);
    const updatedItem = await repo.update(input.id, input.value);
    return getPickBatch(context, updatedItem.pickBatchId);
  });

export const RemovePickBatchItem = implement(
  contracts.RemovePickBatchItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PickBatchItemRepository.fns(context.kysely);
    const removed = await repo.remove(input);
    return getPickBatch(context, removed.pickBatchId);
  });
