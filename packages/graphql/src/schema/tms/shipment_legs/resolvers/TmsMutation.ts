import { TmsShipmentLegStatusEnum } from "../../../../db.types";
import {
	CreateShipmentLegInputSchema,
	type ShipmentLegs,
	UpdateShipmentLegInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<
	TmsMutationResolvers,
	"createShipmentLeg" | "updateShipmentLeg"
> = {
	createShipmentLeg: async (_parent, args, ctx) => {
		const payload = CreateShipmentLegInputSchema().parse(args.value);

		const result = await ctx.db
			.insertInto("tms.shipmentLegs")
			.values({
				...payload,
				status: payload.status
					? TmsShipmentLegStatusEnum[payload.status]
					: undefined,
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as ShipmentLegs;
	},
	updateShipmentLeg: async (_parent, args, ctx) => {
		const payload = UpdateShipmentLegInputSchema().parse(args.value);

		const result = await ctx.db
			.updateTable("tms.shipmentLegs")
			.set({
				...payload,
				status: payload.status
					? TmsShipmentLegStatusEnum[payload.status]
					: undefined,
			})
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as ShipmentLegs;
	},
};
