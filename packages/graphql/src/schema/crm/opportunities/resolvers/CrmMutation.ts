import {
  CrmOpportunitySource,
  CrmOpportunityStage,
} from "../../../../db.types";
import {
  Opportunities,
  UpdateOpportunityInputSchema,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";

export const CrmMutation: Pick<
  CrmMutationResolvers,
  "createOpportunity" | "updateOpportunity"
> = {
  createOpportunity: async (_, args, ctx) => {
    const trx = await ctx.db.startTransaction().execute();

    const { products, ...rest } = args.value;

    const newOpportunity = await trx
      .insertInto("crm.opportunities")
      .values({
        ...rest,
        source: CrmOpportunitySource[rest.source],
        stage: CrmOpportunityStage[rest.stage],
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // add products to opportunity products
    const newOpportunityProducts = await trx
      .insertInto("crm.opportunityProducts")
      .values(
        products.map((row) => ({ opportunityId: newOpportunity.id, ...row }))
      )
      .returning(["productId", "quantity"])
      .execute();

    const dbProducts = await trx
      .selectFrom("crm.products")
      .select(["id", "price"])
      .where(
        "id",
        "in",
        newOpportunityProducts.map((row) => row.productId)
      )
      .execute();

    // add product prices with quantity to deal value
    const totalPrice = dbProducts
      .map(
        (row) =>
          newOpportunityProducts.find((subRow) => subRow.productId === row.id)!
            .quantity * row.price
      )
      .reduce((prev, curr) => prev + curr);

    await trx
      .updateTable("crm.opportunities")
      .set("dealValue", (eb) => eb("dealValue", "+", totalPrice))
      .where("id", "=", newOpportunity.id)
      .executeTakeFirstOrThrow();

    await trx.commit().execute();

    return newOpportunity as unknown as Opportunities;
  },
  updateOpportunity: async (_, args, ctx) => {
    const trx = await ctx.db.startTransaction().execute();

    const payload = UpdateOpportunityInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousOpportunity = await trx
      .selectFrom("crm.opportunities")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const updatedOpportunity = await trx
      .updateTable("crm.opportunities")
      .set({
        ...payload,
        name: payload.name ? payload.name : undefined,
        source: payload.source
          ? CrmOpportunitySource[payload.source]
          : undefined,
        stage: args.value.stage
          ? CrmOpportunityStage[args.value.stage]
          : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirst();

    await trx.commit().execute();

    if (updatedOpportunity) {
      // Publish stage changed event
      if (args.value.stage && args.value.stage !== previousOpportunity.stage) {
        const newStage = CrmOpportunityStage[args.value.stage];

        ctx.pubsub.publish("crm.opportunity.stageChanged", {
          id: updatedOpportunity.id,
          newStage: newStage,
          previousStage: previousOpportunity.stage as CrmOpportunityStage,
          probability: updatedOpportunity.probability,
        });

        // Publish won event
        if (newStage === "CLOSED_WON") {
          ctx.pubsub.publish("crm.opportunity.won", updatedOpportunity);
        }

        // Publish lost event
        if (newStage === "CLOSED_LOST") {
          ctx.pubsub.publish("crm.opportunity.lost", updatedOpportunity);
        }
      }
    }

    return updatedOpportunity as Opportunities;
  },
};
