import { GraphQLError } from "graphql";
import { TmsDriverStatusEnum, TmsTripStatusEnum } from "../../../../db.types";
import {
	CreateDriverInputSchema,
	type Drivers,
	UpdateDriverInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";

export const TmsMutation: Pick<
	TmsMutationResolvers,
	"createDriver" | "removeDriver" | "updateDriver"
> = {
	createDriver: async (_parent, args, ctx) => {
		const payload = CreateDriverInputSchema().parse(args.value);

		// Check for duplicate license number
		const existingDriver = await ctx.db
			.selectFrom("tms.drivers")
			.select("id")
			.where("licenseNumber", "=", payload.licenseNumber)
			.executeTakeFirst();

		if (existingDriver) {
			throw new GraphQLError("Driver with this license number already exists", {
				extensions: {
					code: "DUPLICATE_ERROR",
				},
			});
		}

		// Validate license expiry date if provided
		if (payload.licenseExpiryDate) {
			const expiryDate = new Date(payload.licenseExpiryDate);
			if (expiryDate < new Date()) {
				throw new GraphQLError("License has already expired", {
					extensions: {
						code: "VALIDATION_ERROR",
					},
				});
			}
		}

		const result = await ctx.db
			.insertInto("tms.drivers")
			.values({
				...payload,
				status: payload.status
					? TmsDriverStatusEnum[payload.status]
					: undefined,
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as Drivers;
	},
	updateDriver: async (_parent, args, ctx) => {
		const payload = UpdateDriverInputSchema().parse(args.value);

		// Get the previous state to detect changes
		const previousDriver = await ctx.db
			.selectFrom("tms.drivers")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		// Check for duplicate license number if being updated
		if (
			payload.licenseNumber &&
			payload.licenseNumber !== previousDriver.licenseNumber
		) {
			const existingDriver = await ctx.db
				.selectFrom("tms.drivers")
				.select("id")
				.where("licenseNumber", "=", payload.licenseNumber)
				.executeTakeFirst();

			if (existingDriver) {
				throw new GraphQLError(
					"Driver with this license number already exists",
					{
						extensions: {
							code: "DUPLICATE_ERROR",
						},
					},
				);
			}
		}

		// Validate license expiry date if being updated
		if (payload.licenseExpiryDate) {
			const expiryDate = new Date(payload.licenseExpiryDate);
			if (expiryDate < new Date()) {
				throw new GraphQLError("License expiry date cannot be in the past", {
					extensions: {
						code: "VALIDATION_ERROR",
					},
				});
			}
		}

		const result = await ctx.db
			.updateTable("tms.drivers")
			.set(payload as any)
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		// Publish status changed event
		if (payload.status && payload.status !== previousDriver.status) {
			await ctx.pubsub.publish("tms.driver.statusChanged", {
				id: result.id,
				newStatus: payload.status as TmsDriverStatusEnum,
				previousStatus: previousDriver.status as TmsDriverStatusEnum,
			});
		}

		return result as unknown as Drivers;
	},
	removeDriver: async (_parent, args, ctx) => {
		// Check if driver has active trips
		const activeTrip = await ctx.db
			.selectFrom("tms.trips")
			.select("id")
			.where("driverId", "=", args.id)
			.where("status", "!=", TmsTripStatusEnum.COMPLETED)
			.where("status", "!=", TmsTripStatusEnum.CANCELLED)
			.executeTakeFirst();

		if (activeTrip) {
			throw new GraphQLError(
				"Cannot delete driver with active trips. Please complete or cancel all trips first.",
				{
					extensions: {
						code: "BUSINESS_LOGIC_ERROR",
					},
				},
			);
		}

		const result = await ctx.db
			.deleteFrom("tms.drivers")
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return {
			success: true,
			numDeletedRows: Number(result.numDeletedRows.toString()),
		};
	},
};
