import {
  CreateDmsProofOfDeliveryInputSchema,
  DmsProofOfDeliveries,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";

export const DmsMutation: Pick<DmsMutationResolvers, 'createDmsProofOfDelivery'> = {
  createDmsProofOfDelivery: async (_parent, args, ctx) => {
    const payload = CreateDmsProofOfDeliveryInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("dms.proofOfDeliveries")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish proof of delivery recorded event
    await ctx.pubsub.publish("dms.proofOfDelivery.recorded", result);

    return result as unknown as DmsProofOfDeliveries;
  },
};
