import { DmsTaskEventStatusEnum } from "../../../../db.types";
import type { TaskEvents } from "../../../../zod.schema";
import type { DmsQueryResolvers } from "./../../../types.generated";
export const DmsQuery: Pick<DmsQueryResolvers, "taskEvent" | "taskEvents"> = {
	taskEvents: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("dms.taskEvents").selectAll();

		if (args.page && args.perPage) {
			const offset = (args.page - 1) * args.perPage;
			query = query.offset(offset).limit(args.perPage);
		}

		if (args.from && args.to) {
			query = query
				.where("createdAt", ">=", args.from as Date)
				.where("createdAt", "<=", args.to as Date);
		}

		if (args.search) {
			query = query.where((eb) =>
				eb.or([
					eb("reason", "ilike", `%${args.search}%`),
					eb("notes", "ilike", `%${args.search}%`),
				]),
			);
		}

		if (args.status) {
			query = query.where("status", "=", DmsTaskEventStatusEnum[args.status]);
		}

		const results = await query.orderBy("timestamp", "asc").execute();

		return results as unknown as TaskEvents[];
	},
	taskEvent: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("dms.taskEvents")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirst();

		return (result as unknown as TaskEvents) || null;
	},
};
