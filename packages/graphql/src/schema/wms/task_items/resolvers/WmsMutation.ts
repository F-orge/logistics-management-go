import { WmsTaskItemStatusEnum } from "../../../../db.types";
import {
	CreateTaskItemInputSchema,
	type TaskItems,
	UpdateTaskItemInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<
	WmsMutationResolvers,
	"addTaskItem" | "removeTaskItem" | "updateTaskItem"
> = {
	addTaskItem: async (_parent, args, ctx) => {
		const payload = CreateTaskItemInputSchema().parse(args.value);

		const result = await ctx.db
			.insertInto("wms.taskItems")
			.values({
				...payload,
				taskId: args.id,
				status: payload.status
					? WmsTaskItemStatusEnum[payload.status]
					: undefined,
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as TaskItems;
	},
	updateTaskItem: async (_parent, args, ctx) => {
		const payload = UpdateTaskItemInputSchema().parse(args.value);

		const result = await ctx.db
			.updateTable("wms.taskItems")
			.set(payload as any)
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as TaskItems;
	},
	removeTaskItem: async (_parent, args, ctx) => {
		const result = await ctx.db
			.deleteFrom("wms.taskItems")
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return {
			success: true,
			numDeletedRows: Number(result.numDeletedRows.toString()),
		};
	},
};
