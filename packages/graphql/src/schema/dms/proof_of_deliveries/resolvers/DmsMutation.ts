import { GraphQLError } from "graphql";
import { DmsDeliveryTaskStatusEnum } from "../../../../db.types";
import {
	CreateDmsProofOfDeliveryInputSchema,
	type DmsProofOfDeliveries,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";

export const DmsMutation: Pick<
	DmsMutationResolvers,
	"createDmsProofOfDelivery"
> = {
	createDmsProofOfDelivery: async (_parent, args, ctx) => {
		const payload = CreateDmsProofOfDeliveryInputSchema().parse(args.value);

		// Validate that task exists
		if (!payload.deliveryTaskId) {
			throw new GraphQLError("deliveryTaskId is required", {
				extensions: { code: "VALIDATION_ERROR" },
			});
		}

		try {
			// Check if delivery task exists
			const task = await ctx.db
				.selectFrom("dms.deliveryTasks")
				.selectAll()
				.where("id", "=", payload.deliveryTaskId)
				.executeTakeFirst();

			if (!task) {
				throw new GraphQLError("Delivery task not found", {
					extensions: { code: "NOT_FOUND" },
				});
			}

			// Validate task status is DELIVERED
			if (task.status !== DmsDeliveryTaskStatusEnum.DELIVERED) {
				throw new GraphQLError(
					`Proof of delivery can only be created for DELIVERED tasks, current status is ${task.status}`,
					{
						extensions: { code: "BUSINESS_LOGIC_ERROR" },
					},
				);
			}

			// Require at least one of (signature, photo)
			if (!payload.signatureData && !payload.file) {
				throw new GraphQLError(
					"At least one of signature or photo is required for proof of delivery",
					{
						extensions: { code: "VALIDATION_ERROR" },
					},
				);
			}

			// Check for existing POD (duplicate prevention)
			const existingPod = await ctx.db
				.selectFrom("dms.proofOfDeliveries")
				.select("id")
				.where("deliveryTaskId", "=", payload.deliveryTaskId)
				.executeTakeFirst();

			if (existingPod) {
				throw new GraphQLError(
					"Proof of delivery already exists for this task",
					{
						extensions: { code: "BUSINESS_LOGIC_ERROR" },
					},
				);
			}

			// Auto-set timestamp
			const timestamp = new Date().toISOString();

			const result = await ctx.db
				.insertInto("dms.proofOfDeliveries")
				.values({
					...payload,
					timestamp,
				} as any)
				.returningAll()
				.executeTakeFirstOrThrow();

			// Publish proof of delivery recorded event
			await ctx.pubsub.publish("dms.proofOfDelivery.recorded", result);

			return result as unknown as DmsProofOfDeliveries;
		} catch (error: any) {
			if (error.extensions?.code) {
				throw error;
			}
			throw new GraphQLError("Failed to create proof of delivery", {
				extensions: { code: "DATABASE_ERROR" },
			});
		}
	},
};
