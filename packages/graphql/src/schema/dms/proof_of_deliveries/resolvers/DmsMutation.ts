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
			throw new Error("deliveryTaskId is required");
		}

		try {
			// Check if delivery task exists
			const task = await ctx.db
				.selectFrom("dms.deliveryTasks")
				.selectAll()
				.where("id", "=", payload.deliveryTaskId)
				.executeTakeFirst();

			if (!task) {
				throw new Error(
					`Delivery task with id ${payload.deliveryTaskId} does not exist`,
				);
			}

			// Validate task status is DELIVERED
			if (task.status !== DmsDeliveryTaskStatusEnum.DELIVERED) {
				throw new Error(
					`Delivery task must be in DELIVERED status, current status is ${task.status}`,
				);
			}

			// Require at least one of (signature, photo)
			if (!payload.signatureData && !payload.file) {
				throw new Error(
					"At least one of signature or photo is required for proof of delivery",
				);
			}

			// Check for existing POD (duplicate prevention)
			const existingPod = await ctx.db
				.selectFrom("dms.proofOfDeliveries")
				.select("id")
				.where("deliveryTaskId", "=", payload.deliveryTaskId)
				.executeTakeFirst();

			if (existingPod) {
				throw new Error(
					`Proof of delivery already exists for task ${payload.deliveryTaskId}`,
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
		} catch (error) {
			throw error;
		}
	},
};
