import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'
import * as contracts from '@packages/rpc/contracts/wms/task'
import {
  PickBatchRepository,
  TaskItemRepository,
  TaskRepository,
  WarehouseRepository,
} from '@packages/db/repositories/wms'
import { UserRepository } from '@packages/db/repositories/auth'

async function getTask(context: ORPCContext, id: string) {
  const repo = TaskRepository.fns(context.kysely)
  const result = await repo.find(id)

  const [warehouse, user, pickBatch, items] = await Promise.all([
    WarehouseRepository.fns(context.kysely).find(result.warehouseId),
    result.userId ? UserRepository.fns(context.kysely).find(result.userId) : undefined,
    result.pickBatchId
      ? PickBatchRepository.fns(context.kysely).find(result.pickBatchId)
      : undefined,
    TaskItemRepository.fns(context.kysely).paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: 'taskId', operator: 'in', value: [id] }],
    }),
  ])

  return {
    ...result,
    warehouse: warehouse!,
    user,
    pickBatch,
    items,
  }
}

export const PaginateTask = implement(contracts.PaginateTaskContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = TaskRepository.fns(context.kysely)
    const result = await repo.paginate(input)
    if (result.length === 0) {
      return []
    }

    const [warehouses, users, pickBatches, items] = await Promise.all([
      WarehouseRepository.fns(context.kysely).any(result.map((r) => r.warehouseId)),
      UserRepository.fns(context.kysely).any(result.map((r) => r.userId).filter(nonEmpty)),
      PickBatchRepository.fns(context.kysely).any(
        result.map((r) => r.pickBatchId).filter(nonEmpty),
      ),
      TaskItemRepository.fns(context.kysely).paginate({
        page: 1,
        perPage: 1000,
        filters: [{ column: 'taskId', operator: 'in', value: result.map((r) => r.id) }],
      }),
    ])

    return result.map((row) => ({
      ...row,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      user: users.find((u) => u.id === row.userId),
      pickBatch: pickBatches.find((p) => p.id === row.pickBatchId),
      items: items.filter((i) => i.taskId === row.id),
    }))
  })

export const RangeTask = implement(contracts.RangeTaskContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = TaskRepository.fns(context.kysely)
    const result = await repo.range(input)
    if (result.length === 0) {
      return []
    }

    const [warehouses, users, pickBatches, items] = await Promise.all([
      WarehouseRepository.fns(context.kysely).any(result.map((r) => r.warehouseId)),
      UserRepository.fns(context.kysely).any(result.map((r) => r.userId).filter(nonEmpty)),
      PickBatchRepository.fns(context.kysely).any(
        result.map((r) => r.pickBatchId).filter(nonEmpty),
      ),
      TaskItemRepository.fns(context.kysely).paginate({
        page: 1,
        perPage: 1000,
        filters: [{ column: 'taskId', operator: 'in', value: result.map((r) => r.id) }],
      }),
    ])

    return result.map((row) => ({
      ...row,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      user: users.find((u) => u.id === row.userId),
      pickBatch: pickBatches.find((p) => p.id === row.pickBatchId),
      items: items.filter((i) => i.taskId === row.id),
    }))
  })

export const AnyTask = implement(contracts.AnyTaskContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = TaskRepository.fns(context.kysely)
    const result = await repo.any(input)
    if (result.length === 0) {
      return []
    }

    const [warehouses, users, pickBatches, items] = await Promise.all([
      WarehouseRepository.fns(context.kysely).any(result.map((r) => r.warehouseId)),
      UserRepository.fns(context.kysely).any(result.map((r) => r.userId).filter(nonEmpty)),
      PickBatchRepository.fns(context.kysely).any(
        result.map((r) => r.pickBatchId).filter(nonEmpty),
      ),
      TaskItemRepository.fns(context.kysely).paginate({
        page: 1,
        perPage: 1000,
        filters: [{ column: 'taskId', operator: 'in', value: result.map((r) => r.id) }],
      }),
    ])

    return result.map((row) => ({
      ...row,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      user: users.find((u) => u.id === row.userId),
      pickBatch: pickBatches.find((p) => p.id === row.pickBatchId),
      items: items.filter((i) => i.taskId === row.id),
    }))
  })

export const InsertTask = implement(contracts.InsertTaskContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const { items, ...data } = input
    const repo = TaskRepository.fns(context.kysely)
    const result = await repo.insert(data)

    await TaskItemRepository.fns(context.kysely).insertMany(
      items.map((item) => ({ ...item, taskId: result.id })),
    )

    return getTask(context, result.id)
  })

export const InsertManyTask = implement(contracts.InsertManyTaskContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = TaskRepository.fns(context.kysely)
    const result = await repo.insertMany(input.map(({ items, ...d }) => d))
    const allItems = input.flatMap((d, i) =>
      d.items.map((item) => ({ ...item, taskId: result[i].id })),
    )
    await TaskItemRepository.fns(context.kysely).insertMany(allItems)

    return Promise.all(result.map((r) => getTask(context, r.id)))
  })

export const UpdateTask = implement(contracts.UpdateTaskContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = TaskRepository.fns(context.kysely)
    await repo.update(input.id, input.value)
    return getTask(context, input.id)
  })

export const RemoveTask = implement(contracts.RemoveTaskContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = TaskRepository.fns(context.kysely)
    return await repo.remove(input)
  })

export const InsertTaskItem = implement(contracts.InsertTaskItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = TaskItemRepository.fns(context.kysely)
    return repo.insert(input)
  })

export const InsertManyTaskItem = implement(contracts.InsertManyTaskItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = TaskItemRepository.fns(context.kysely)
    return repo.insertMany(input)
  })

export const UpdateTaskItem = implement(contracts.UpdateTaskItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = TaskItemRepository.fns(context.kysely)
    return repo.update(input.id, input.value)
  })

export const RemoveTaskItem = implement(contracts.RemoveTaskItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = TaskItemRepository.fns(context.kysely)
    return repo.remove(input)
  })
