import {
  AddOpportunityProductInputSchema,
  OpportunityProducts,
  UpdateOpportunityProductInputSchema,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<
  CrmMutationResolvers,
  | "addOpportunityProduct"
  | "removeOpportunityProduct"
  | "updateOpportunityProduct"
> = {
  addOpportunityProduct: async (_, args, ctx) => {
    const payload = AddOpportunityProductInputSchema().parse(args.value);

    const trx = await ctx.db.startTransaction().execute();

    // add products to opportunity and update deal value
    const newOpportunityProduct = await trx
      .insertInto("crm.opportunityProducts")
      .values({
        opportunityId: args.id,
        ...payload,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    const product = await trx
      .selectFrom("crm.products")
      .select("price")
      .where("id", "=", newOpportunityProduct.productId)
      .executeTakeFirstOrThrow();

    // update the deal value
    await trx
      .updateTable("crm.opportunities")
      .set("dealValue", (eb) =>
        eb("dealValue", "+", product.price * newOpportunityProduct.quantity)
      )
      .where("id", "=", newOpportunityProduct.opportunityId)
      .executeTakeFirstOrThrow();

    await trx.commit().execute();

    return newOpportunityProduct as unknown as OpportunityProducts;
  },
  updateOpportunityProduct: async (_, args, ctx) => {
    const trx = await ctx.db.startTransaction().execute();

    const payload = UpdateOpportunityProductInputSchema().parse(args.value);

    const oldOpportunityProduct = await trx
      .selectFrom("crm.opportunityProducts")
      .select(["id", "quantity", "productId"])
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const updatedOpportunityProduct = await trx
      .updateTable("crm.opportunityProducts")
      .set("quantity", payload.quantity)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    const product = await trx
      .selectFrom("crm.products")
      .select(["id", "price"])
      .where("id", "in", [
        updatedOpportunityProduct.productId,
        oldOpportunityProduct.productId,
      ])
      .execute();

    const oldProductPrice = product.find(
      (p) => p.id === oldOpportunityProduct.productId
    )!.price;

    const newProductPrice = product.find(
      (p) => p.id === updatedOpportunityProduct.productId
    )!.price;

    // update deal value
    const oldTotal = oldProductPrice * oldOpportunityProduct.quantity;
    const newTotal = newProductPrice * updatedOpportunityProduct.quantity;
    const difference = newTotal - oldTotal;

    // update deal value
    await trx
      .updateTable("crm.opportunities")
      .set("dealValue", (eb) => eb("dealValue", "+", difference))
      .where("id", "=", updatedOpportunityProduct.opportunityId)
      .executeTakeFirstOrThrow();

    await trx.commit().execute();

    return updatedOpportunityProduct as unknown as OpportunityProducts;
  },
};
