import { DeliveryTasks } from "../../../../zod.schema";
import type { DmsProofOfDeliveriesResolvers } from "./../../../types.generated";
export const DmsProofOfDeliveries: DmsProofOfDeliveriesResolvers = {
  deliveryTask: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("dms.deliveryTasks")
      .selectAll("dms.deliveryTasks")
      .innerJoin(
        "dms.proofOfDeliveries",
        "dms.proofOfDeliveries.deliveryTaskId",
        "dms.deliveryTasks.id"
      )
      .where("dms.proofOfDeliveries.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as DeliveryTasks;
  },
};
