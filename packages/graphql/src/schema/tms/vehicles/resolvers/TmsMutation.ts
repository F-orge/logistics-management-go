import { TmsVehicleStatusEnum } from "../../../../db.types";
import {
	CreateVehicleInputSchema,
	UpdateVehicleInputSchema,
	type Vehicles,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<
	TmsMutationResolvers,
	"createVehicle" | "removeVehicle" | "updateVehicle"
> = {
	createVehicle: async (_parent, args, ctx) => {
		const payload = CreateVehicleInputSchema().parse(args.value);

		const result = await ctx.db
			.insertInto("tms.vehicles")
			.values({
				...payload,
				status: payload.status
					? TmsVehicleStatusEnum[payload.status]
					: undefined,
			})
			.returningAll()

			.executeTakeFirstOrThrow();

		return result as unknown as Vehicles;
	},
	updateVehicle: async (_parent, args, ctx) => {
		const payload = UpdateVehicleInputSchema().parse(args.value);

		// Get the previous state to detect changes
		const previousVehicle = await ctx.db
			.selectFrom("tms.vehicles")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		const result = await ctx.db
			.updateTable("tms.vehicles")
			.set({
				...payload,
				status: payload.status
					? TmsVehicleStatusEnum[payload.status]
					: undefined,
			})
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		// Publish status changed event
		if (payload.status && payload.status !== previousVehicle.status) {
			await ctx.pubsub.publish("tms.vehicle.statusChanged", {
				id: result.id,
				newStatus: payload.status as TmsVehicleStatusEnum,
				previousStatus: previousVehicle.status as TmsVehicleStatusEnum,
			});
		}

		return result as unknown as Vehicles;
	},
	removeVehicle: async (_parent, args, ctx) => {
		const result = await ctx.db
			.deleteFrom("tms.vehicles")
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return {
			success: true,
			numDeletedRows: Number(result.numDeletedRows.toString()),
		};
	},
};
