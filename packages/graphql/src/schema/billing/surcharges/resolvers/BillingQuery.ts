import { BillingSurchargeCalculationMethodEnum } from "../../../../db.types";
import { Surcharges } from "../../../../zod.schema";
import type { BillingQueryResolvers } from "./../../../types.generated";
export const BillingQuery: Pick<BillingQueryResolvers, 'surcharge'|'surcharges'> = {
  surcharges: async (parent, args, ctx) => {
    let query = ctx.db.selectFrom("billing.surcharges").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    if (args.from && args.to) {
      query = query
        .clearLimit()
        .clearOffset()
        .where("createdAt", ">=", args.from as Date)
        .where("createdAt", "<=", args.to as Date);
    }

    if (args.search) {
      query = query.where((eb) =>
        eb.or([eb("name", "ilike", `%${args.search}%`)])
      );
    }

    if (args.calculationMethod) {
      query = query.where(
        "calculationMethod",
        "=",
        BillingSurchargeCalculationMethodEnum[args.calculationMethod]
      );
    }

    const results = await query.execute();

    return results as unknown as Surcharges[];
  },
  surcharge: async (_, args, ctx) => {
    const result = await ctx.db
      .selectFrom("billing.surcharges")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return result as unknown as Surcharges;
  },
};
