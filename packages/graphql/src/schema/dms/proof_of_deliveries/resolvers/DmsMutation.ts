import {
  CreateDmsProofOfDeliveryInputSchema,
  DmsProofOfDeliveries,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";
export const DmsMutation: Pick<
  DmsMutationResolvers,
  "createDmsProofOfDelivery"
> = {
  createDmsProofOfDelivery: async (_parent, args, ctx) => {
    const payload = CreateDmsProofOfDeliveryInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("dms.proofOfDeliveries")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as DmsProofOfDeliveries;
  },
};
