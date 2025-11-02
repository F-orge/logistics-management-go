import { TmsCarrierRateUnitEnum } from "../../../../db.types";
import {
	type CarrierRates,
	CreateCarrierRateInputSchema,
	UpdateCarrierRateInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<
	TmsMutationResolvers,
	"createCarrierRate" | "removeCarrierRate" | "updateCarrierRate"
> = {
	createCarrierRate: async (_parent, args, ctx) => {
		const payload = CreateCarrierRateInputSchema().parse(args.value);

		const result = await ctx.db
			.insertInto("tms.carrierRates")
			.values({
				...payload,
				unit: payload.unit
					? TmsCarrierRateUnitEnum[payload.unit]
					: TmsCarrierRateUnitEnum.FLAT_RATE,
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as CarrierRates;
	},
	updateCarrierRate: async (_parent, args, ctx) => {
		const payload = UpdateCarrierRateInputSchema().parse(args.value);

		const result = await ctx.db
			.updateTable("tms.carrierRates")
			.set({
				...payload,
				unit: payload.unit ? TmsCarrierRateUnitEnum[payload.unit] : undefined,
			})
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as CarrierRates;
	},
	removeCarrierRate: async (_parent, args, ctx) => {
		const result = await ctx.db
			.deleteFrom("tms.carrierRates")
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return {
			success: true,
			numDeletedRows: Number(result.numDeletedRows.toString()),
		};
	},
};
