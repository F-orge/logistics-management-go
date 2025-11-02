import { GraphQLError } from "graphql";
import { CrmLeadSource, CrmLeadStatus } from "../../../../db.types";
import type { Leads } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<CrmQueryResolvers, "lead" | "leads"> = {
	leads: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("crm.leads").selectAll();

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
					eb("name", "ilike", `%${args.search}%`),
					eb("email", "ilike", `%${args.search}%`),
				]),
			);
		}

		if (args.leadSource) {
			query = query.where("leadSource", "=", CrmLeadSource[args.leadSource]);
		}

		if (args.status) {
			query = query.where("status", "=", CrmLeadStatus[args.status]);
		}

		// Apply sorting
		if (args.sortBy) {
			const direction = args.sortDirection === "DESC" ? "desc" : "asc";
			if (args.sortBy === "createdAt") {
				query = query.orderBy("createdAt", direction);
			} else if (args.sortBy === "status") {
				query = query.orderBy("status", direction);
			} else if (args.sortBy === "name") {
				query = query.orderBy("name", direction);
			}
		} else {
			// Default sorting
			query = query.orderBy("createdAt", "desc");
		}

		const results = await query.execute();
		return results as unknown as Leads[];
	},
	lead: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.leads")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as Leads;
	},
};
