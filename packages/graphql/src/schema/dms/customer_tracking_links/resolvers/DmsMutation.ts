import { DmsDeliveryTaskStatusEnum } from "../../../../db.types";
import {
	CreateCustomerTrackingLinkInputSchema,
	type CustomerTrackingLinks,
	UpdateCustomerTrackingLinkInputSchema,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";

export const DmsMutation: Pick<
	DmsMutationResolvers,
	"createCustomerTrackingLink" | "updateCustomerTrackingLink"
> = {
	createCustomerTrackingLink: async (_parent, args, ctx) => {
		const payload = CreateCustomerTrackingLinkInputSchema().parse(args.value);

		try {
			// Validate delivery task exists
			const deliveryTask = await ctx.db
				.selectFrom("dms.deliveryTasks")
				.select(["id", "status", "recipientName", "recipientPhone"])
				.where("id", "=", payload.deliveryTaskId)
				.executeTakeFirst();

			if (!deliveryTask) {
				throw new Error(
					`Delivery task with id ${payload.deliveryTaskId} does not exist`,
				);
			}

			// Validate task status is OUT_FOR_DELIVERY
			if (deliveryTask.status !== DmsDeliveryTaskStatusEnum.OUT_FOR_DELIVERY) {
				throw new Error(
					`Tracking link can only be created for tasks with status OUT_FOR_DELIVERY, current status is ${deliveryTask.status}`,
				);
			}

			// Validate customer contact info exists (at least name or phone)
			if (!deliveryTask.recipientName && !deliveryTask.recipientPhone) {
				throw new Error(
					"Cannot create tracking link: recipient name or phone number is required",
				);
			}

			// Check for duplicate tracking link
			const existingLink = await ctx.db
				.selectFrom("dms.customerTrackingLinks")
				.select("id")
				.where("deliveryTaskId", "=", payload.deliveryTaskId)
				.executeTakeFirst();

			if (existingLink) {
				throw new Error(
					`Tracking link already exists for delivery task ${payload.deliveryTaskId}`,
				);
			}

			const result = await ctx.db
				.insertInto("dms.customerTrackingLinks")
				.values({
					...payload,
					isActive: true,
					accessCount: 0,
				})
				.returningAll()
				.executeTakeFirstOrThrow();

			// Publish generated event for new tracking link
			await ctx.pubsub.publish("dms.trackingLink.generated", result);

			return result as unknown as CustomerTrackingLinks;
		} catch (error) {
			throw error;
		}
	},
	updateCustomerTrackingLink: async (_parent, args, ctx) => {
		const payload = UpdateCustomerTrackingLinkInputSchema().parse(args.value);

		try {
			// Get the tracking link
			const link = await ctx.db
				.selectFrom("dms.customerTrackingLinks")
				.selectAll()
				.where("id", "=", args.id)
				.executeTakeFirstOrThrow();

			// Prevent updates to expired links
			if (link.expiresAt && new Date(link.expiresAt) <= new Date()) {
				throw new Error("Cannot update expired tracking link");
			}

			// Prevent updates to inactive links
			if (link.isActive !== true) {
				throw new Error("Cannot update inactive tracking link");
			}

			// Get the associated delivery task to check its status
			const deliveryTask = await ctx.db
				.selectFrom("dms.deliveryTasks")
				.select("status")
				.where("id", "=", link.deliveryTaskId)
				.executeTakeFirstOrThrow();

			// Prevent updates for completed tasks
			if (
				deliveryTask.status === DmsDeliveryTaskStatusEnum.DELIVERED ||
				deliveryTask.status === DmsDeliveryTaskStatusEnum.FAILED ||
				deliveryTask.status === DmsDeliveryTaskStatusEnum.CANCELLED
			) {
				throw new Error(
					`Cannot update tracking link for delivery task with status ${deliveryTask.status}`,
				);
			}

			// Restrict updatable fields (only expiration and isActive allowed)
			const updateData: Record<string, any> = {};
			if (payload.isActive !== undefined) {
				updateData.isActive = payload.isActive;
			}
			if (payload.expiresAt !== undefined) {
				updateData.expiresAt = payload.expiresAt;
			}
			// accessCount can only be set via query updates when accessed, not directly by user

			const result = await ctx.db
				.updateTable("dms.customerTrackingLinks")
				.set(updateData)
				.where("id", "=", args.id)
				.returningAll()
				.executeTakeFirstOrThrow();

			// Publish expired event if link became inactive or expired
			const isNowExpired =
				(result.expiresAt && new Date(result.expiresAt) <= new Date()) ||
				result.isActive !== true;
			const wasExpiredBefore =
				(link.expiresAt && new Date(link.expiresAt) <= new Date()) ||
				link.isActive !== true;

			if (isNowExpired && !wasExpiredBefore) {
				await ctx.pubsub.publish("dms.trackingLink.expired", {
					id: result.id,
					deliveryTaskId: result.deliveryTaskId,
					trackingToken: result.trackingToken,
				});
			}

			return result as unknown as CustomerTrackingLinks;
		} catch (error) {
			throw error;
		}
	},
};
