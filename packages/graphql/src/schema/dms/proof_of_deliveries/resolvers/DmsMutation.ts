import {
  CreateDmsProofOfDeliveryInputSchema,
  DmsProofOfDeliveries,
  UpdateDmsProofOfDeliveryInputSchema,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";
export const DmsMutation: Pick<
  DmsMutationResolvers,
  | "createDmsProofOfDelivery"
  | "removeDmsProofOfDelivery"
  | "updateDmsProofOfDelivery"
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
  updateDmsProofOfDelivery: async (_parent, args, ctx) => {
    const payload = UpdateDmsProofOfDeliveryInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("dms.proofOfDeliveries")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as DmsProofOfDeliveries;
  },
  removeDmsProofOfDelivery: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("dms.proofOfDeliveries")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
