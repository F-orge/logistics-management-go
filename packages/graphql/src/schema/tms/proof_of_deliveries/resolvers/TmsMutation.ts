import {
  CreateProofOfDeliveryInputSchema,
  ProofOfDeliveries,
  UpdateProofOfDeliveryInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<
  TmsMutationResolvers,
  "createProofOfDelivery" | "removeProofOfDelivery" | "updateProofOfDelivery"
> = {
  createProofOfDelivery: async (_parent, args, ctx) => {
    const payload = CreateProofOfDeliveryInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.proofOfDeliveries")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as ProofOfDeliveries;
  },
  updateProofOfDelivery: async (_parent, args, ctx) => {
    const payload = UpdateProofOfDeliveryInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.proofOfDeliveries")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as ProofOfDeliveries;
  },
  removeProofOfDelivery: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.proofOfDeliveries")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
