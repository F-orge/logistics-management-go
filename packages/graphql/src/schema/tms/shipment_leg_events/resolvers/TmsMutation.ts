import {
	CreateShipmentLegEventInputSchema,
	type ShipmentLegEvents,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<TmsMutationResolvers, "createShipmentLegEvent"> =
	{
		createShipmentLegEvent: async (_parent, args, ctx) => {
			const payload = CreateShipmentLegEventInputSchema().parse(args.value);

			const result = await ctx.db
				.insertInto("tms.shipmentLegEvents")
				.values(payload)
				.returningAll()
				.executeTakeFirstOrThrow();

			return result as unknown as ShipmentLegEvents;
		},
	};
