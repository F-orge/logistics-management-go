import {
	CreateDriverLocationInputSchema,
	type DriverLocations,
	UpdateDriverLocationInputSchema,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";

export const DmsMutation: Pick<
	DmsMutationResolvers,
	"createDriverLocation" | "removeDriverLocation" | "updateDriverLocation"
> = {
	createDriverLocation: async (_parent, args, ctx) => {
		const payload = CreateDriverLocationInputSchema().parse(args.value);

		const result = await ctx.db
			.insertInto("dms.driverLocations")
			.values(payload)
			.returningAll()
			.executeTakeFirstOrThrow();

		// Publish driver location updated event
		await ctx.pubsub.publish("dms.driverLocation.updated", result);

		return result as unknown as DriverLocations;
	},
	updateDriverLocation: async (_parent, args, ctx) => {
		const payload = UpdateDriverLocationInputSchema().parse(args.value);

		const result = await ctx.db
			.updateTable("dms.driverLocations")
			.set(payload)
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		// Publish driver location updated event
		await ctx.pubsub.publish("dms.driverLocation.updated", result);

		return result as unknown as DriverLocations;
	},
	removeDriverLocation: async (_parent, args, ctx) => {
		// Get the location to get the driver ID before deleting
		const location = await ctx.db
			.selectFrom("dms.driverLocations")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		const result = await ctx.db
			.deleteFrom("dms.driverLocations")
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		// Publish driver location removed event
		await ctx.pubsub.publish("dms.driverLocation.removed", {
			id: location.id,
			driverId: location.driverId,
		});

		return {
			success: true,
			numDeletedRows: Number(result.numDeletedRows.toString()),
		};
	},
};
