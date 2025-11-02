import { GraphQLError } from "graphql";
import { DmsTaskEventStatusEnum } from "../../../../db.types";
import {
	CreateTaskEventInputSchema,
	type TaskEvents,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";

export const DmsMutation: Pick<DmsMutationResolvers, "createTaskEvent"> = {
	createTaskEvent: async (_parent, args, ctx) => {
		const payload = CreateTaskEventInputSchema().parse(args.value);

		// Validate that delivery_task exists
		if (!payload.deliveryTaskId) {
			throw new GraphQLError("deliveryTaskId is required", {
				extensions: { code: "VALIDATION_ERROR" },
			});
		}

		try {
			// Check if delivery task exists
			const task = await ctx.db
				.selectFrom("dms.deliveryTasks")
				.select("id")
				.where("id", "=", payload.deliveryTaskId)
				.executeTakeFirst();

			if (!task) {
				throw new GraphQLError("Delivery task not found", {
					extensions: { code: "NOT_FOUND" },
				});
			}

			// Validate status is valid enum value
			if (payload.status) {
				const validStatuses = Object.values(DmsTaskEventStatusEnum);
				if (!validStatuses.includes(payload.status as DmsTaskEventStatusEnum)) {
					throw new GraphQLError(
						`Invalid task event status: ${payload.status}`,
						{
							extensions: { code: "VALIDATION_ERROR" },
						},
					);
				}
			}

			// Auto-set timestamp (don't use provided timestamp)
			const timestamp = new Date().toISOString();

			const result = await ctx.db
				.insertInto("dms.taskEvents")
				.values({
					...payload,
					status: payload.status
						? DmsTaskEventStatusEnum[payload.status]
						: DmsTaskEventStatusEnum.STARTED,
					timestamp,
				})
				.returningAll()
				.executeTakeFirstOrThrow();

			// Publish task event recorded
			await ctx.pubsub.publish("dms.taskEvent.recorded", result);

			// Publish status updated if applicable
			if (payload.status) {
				await ctx.pubsub.publish("dms.taskEvent.statusUpdated", {
					taskEventId: result.id,
					deliveryTaskId: result.deliveryTaskId,
					newStatus: payload.status as DmsTaskEventStatusEnum,
				});
			}

			return result as unknown as TaskEvents;
		} catch (error: any) {
			if (error.extensions?.code) {
				throw error;
			}
			throw new GraphQLError("Failed to create task event", {
				extensions: { code: "DATABASE_ERROR" },
			});
		}
	},
};
