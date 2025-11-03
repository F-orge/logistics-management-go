import { TmsProofTypeEnum } from "../../../../db.types";
import type { ProofOfDeliveries } from "../../../../zod.schema";
import type { TmsQueryResolvers } from "./../../../types.generated";
export const TmsQuery: Pick<
	TmsQueryResolvers,
	"proofOfDeliveries" | "proofOfDelivery"
> = {
	proofOfDeliveries: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("tms.proofOfDeliveries").selectAll();

		if (args.tripStopId) {
			query = query.where("tripStopId", "=", args.tripStopId);
		}

		if (args.tripId) {
			query = query.where("tripId", "=", args.tripId);
		}

		if (args.from && args.to) {
			query = query
				.where("createdAt", ">=", args.from as Date)
				.where("createdAt", "<=", args.to as Date);
		}

		if (args.search) {
			query = query.where((eb) =>
				eb.or([eb("filePath", "ilike", `%${args.search}%`)]),
			);
		}

		if (args.type) {
			query = query.where("type", "=", TmsProofTypeEnum[args.type]);
		}

		if (args.page && args.perPage) {
			const offset = (args.page - 1) * args.perPage;
			query = query.offset(offset).limit(args.perPage);
		}

		const results = await query.execute();

		return results as unknown as ProofOfDeliveries[];
	},
	proofOfDelivery: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("tms.proofOfDeliveries")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as ProofOfDeliveries;
	},
};
