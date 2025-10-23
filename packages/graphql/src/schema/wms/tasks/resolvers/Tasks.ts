import {
  PickBatches,
  TaskItems,
  User,
  Warehouses,
} from "../../../../zod.schema";
import type { TasksResolvers } from "./../../../types.generated";
export const Tasks: TasksResolvers = {
  warehouse: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.warehouses")
      .selectAll("wms.warehouses")
      .innerJoin("wms.tasks", "wms.tasks.warehouseId", "wms.warehouses.id")
      .where("wms.tasks.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Warehouses;
  },
  user: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("user")
      .selectAll("user")
      .innerJoin("wms.tasks", "wms.tasks.userId", "user.id")
      .where("wms.tasks.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as User;
  },
  pickBatch: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("wms.pickBatches")
      .selectAll("wms.pickBatches")
      .innerJoin("wms.tasks", "wms.tasks.pickBatchId", "wms.pickBatches.id")
      .where("wms.tasks.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as PickBatches;
  },
  items: async (parent, _args, ctx) => {
    const results = await ctx.db
      .selectFrom("wms.taskItems")
      .selectAll("wms.taskItems")
      .where("wms.taskItems.taskId", "=", parent.id as string)
      .execute();

    return results as unknown as TaskItems[];
  },
};
