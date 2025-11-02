import type { Contacts } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<CrmQueryResolvers, "contact" | "contacts"> = {
	contacts: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("crm.contacts").selectAll();

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
					eb("name", "ilike", `%${args.search}%`),
					eb("email", "ilike", `%${args.search}%`),
				]),
			);
		}

		// Apply companyId filter
		if (args.companyId) {
			query = query.where("companyId", "=", args.companyId);
		}

		// Apply jobTitle filter
		if (args.jobTitle) {
			query = query.where("jobTitle", "ilike", `%${args.jobTitle}%`);
		}

		// Apply ownerId filter
		if (args.ownerId) {
			query = query.where("ownerId", "=", args.ownerId);
		}

		// Apply sorting
		if (args.sortBy) {
			const direction =
				args.sortDirection?.toUpperCase() === "DESC" ? "desc" : "asc";
			if (args.sortBy === "name") {
				query = query.orderBy("name", direction);
			} else if (args.sortBy === "createdAt") {
				query = query.orderBy("createdAt", direction);
			} else if (args.sortBy === "jobTitle") {
				query = query.orderBy("jobTitle", direction);
			}
		}

		const results = await query.execute();
		return results as unknown as Contacts[];
	},
	contact: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.contacts")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as Contacts;
	},
};
