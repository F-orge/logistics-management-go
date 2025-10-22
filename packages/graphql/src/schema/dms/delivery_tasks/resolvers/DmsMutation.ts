import {
  CreateDeliveryTaskInputSchema,
  DeliveryTasks,
  UpdateDeliveryTaskInputSchema,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";
export const DmsMutation: Pick<DmsMutationResolvers, 'createDeliveryTask'|'removeDeliveryTask'|'updateDeliveryTask'> = {
  createDeliveryTask: async (_parent, args, ctx) => {
    const payload = CreateDeliveryTaskInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("dms.deliveryTasks")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as DeliveryTasks;
  },
  updateDeliveryTask: async (_parent, args, ctx) => {
    const payload = UpdateDeliveryTaskInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("dms.deliveryTasks")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as DeliveryTasks;
  },
  removeDeliveryTask: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("dms.deliveryTasks")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
