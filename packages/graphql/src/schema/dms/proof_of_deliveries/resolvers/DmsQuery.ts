import { DmsProofOfDeliveryTypeEnum } from "../../../../db.types";
import { DmsProofOfDeliveries } from "../../../../zod.schema";
import type { DmsQueryResolvers } from "./../../../types.generated";
export const DmsQuery: Pick<DmsQueryResolvers, 'dmsProofOfDeliveries'|'dmsProofOfDelivery'> = {
  dmsProofOfDeliveries: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("dms.proofOfDeliveries").selectAll();

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
        eb.or([
          eb("filePath", "ilike", `%${args.search}%`),
          eb("signatureData", "ilike", `%${args.search}%`),
          eb("recipientName", "ilike", `%${args.search}%`),
          eb("verificationCode", "ilike", `%${args.search}%`),
        ])
      );
    }

    if (args.type) {
      query = query.where("type", "=", DmsProofOfDeliveryTypeEnum[args.type]);
    }

    const results = await query.execute();

    return results as unknown as DmsProofOfDeliveries[];
  },
  dmsProofOfDelivery: async (_parent, args, ctx) => {
    const result = await ctx.db
      .selectFrom("dms.proofOfDeliveries")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirst();

    return result as unknown as DmsProofOfDeliveries;
  },
};
