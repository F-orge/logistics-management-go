import { WmsOutboundShipmentStatusEnum } from "../../../../db.types";
import type { OutboundShipments } from "../../../../zod.schema";
import type { WmsQueryResolvers } from "./../../../types.generated";
export const WmsQuery: Pick<
	WmsQueryResolvers,
	"outboundShipment" | "outboundShipments"
> = {
	outboundShipments: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("wms.outboundShipments").selectAll();

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
					eb("trackingNumber", "ilike", `%${args.search}%`),
					eb("carrier", "ilike", `%${args.search}%`),
				]),
			);
		}

		if (args.status) {
			query = query.where(
				"status",
				"=",
				WmsOutboundShipmentStatusEnum[args.status],
			);
		}

		const results = await query.execute();

		return results as unknown as OutboundShipments[];
	},
	outboundShipment: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.outboundShipments")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as OutboundShipments;
	},
};
