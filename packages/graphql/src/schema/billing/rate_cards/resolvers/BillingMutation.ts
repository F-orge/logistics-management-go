import { BillingServiceTypeEnum } from "../../../../db.types";
import {
  CreateRateCardInputSchema,
  RateCards,
  UpdateRateCardInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";

export const BillingMutation: Pick<
  BillingMutationResolvers,
  "createRateCard" | "removeRateCard" | "updateRateCard"
> = {
  createRateCard: async (_parent, args, ctx) => {
    const payload = CreateRateCardInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("billing.rateCards")
      .values({
        ...payload,
        serviceType: payload.serviceType
          ? BillingServiceTypeEnum[payload.serviceType]
          : BillingServiceTypeEnum.PACKAGING,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as RateCards;
  },
  updateRateCard: async (_parent, args, ctx) => {
    const payload = UpdateRateCardInputSchema().parse(args.value);

    const previous = await ctx.db
      .selectFrom("billing.rateCards")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("billing.rateCards")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish deactivation event if rate card is being deactivated
    if (payload.isActive === false && previous.isActive !== false) {
      ctx.pubsub.publish("billing.rateCard.deactivated", {
        id: result.id,
        name: result.name,
        reason: "Rate card deactivated",
      });
    }

    return result as unknown as RateCards;
  },
  removeRateCard: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("billing.rateCards")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
