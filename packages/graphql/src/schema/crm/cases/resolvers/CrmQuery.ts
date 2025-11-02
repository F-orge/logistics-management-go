import {
	CrmCasePriority,
	CrmCaseStatus,
	CrmCaseType,
} from "../../../../db.types";
import type { Cases } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<CrmQueryResolvers, "case" | "cases"> = {
	cases: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("crm.cases").selectAll();

		// Apply pagination
		if (args.page && args.perPage) {
			const offset = (args.page - 1) * args.perPage;
			query = query.offset(offset).limit(args.perPage);
		}

		// Apply date filters (without clearing pagination)
		if (args.from && args.to) {
			query = query
				.where("createdAt", ">=", args.from as Date)
				.where("createdAt", "<=", args.to as Date);
		}

		// Apply text search
		if (args.search) {
			query = query.where((eb) =>
				eb.or([
					eb("caseNumber", "ilike", `%${args.search}%`),
					eb("description", "ilike", `%${args.search}%`),
				]),
			);
		}

		// Apply status filter
		if (args.status) {
			query = query.where("status", "=", CrmCaseStatus[args.status]);
		}

		// Apply priority filter
		if (args.priority) {
			query = query.where("priority", "=", CrmCasePriority[args.priority]);
		}

		// Apply type filter
		if (args.type) {
			query = query.where("type", "=", CrmCaseType[args.type]);
		}

		// Apply active filter (exclude Closed status)
		if (args.active) {
			query = query.where("status", "!=", CrmCaseStatus.CLOSED);
		}

		// Apply assignedTo filter
		if (args.assignedTo) {
			query = query.where("ownerId", "=", args.assignedTo);
		}

		// Apply sorting
		if (args.sortBy) {
			const direction =
				args.sortDirection?.toUpperCase() === "DESC" ? "desc" : "asc";
			if (args.sortBy === "status") {
				query = query.orderBy("status", direction);
			} else if (args.sortBy === "priority") {
				query = query.orderBy("priority", direction);
			} else if (args.sortBy === "createdAt") {
				query = query.orderBy("createdAt", direction);
			}
		}

		const results = await query.execute();
		return results as unknown as Cases[];
	},
	case: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.cases")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as Cases;
	},
};
