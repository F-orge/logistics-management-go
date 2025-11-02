import { CrmInteractionType } from "../../../../db.types";
import type { Interactions } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<CrmQueryResolvers, "interaction" | "interactions"> =
	{
		interactions: async (_parent, args, ctx) => {
			let query = ctx.db.selectFrom("crm.interactions").selectAll();

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
						eb("outcome", "ilike", `%${args.search}%`),
						eb("notes", "ilike", `%${args.search}%`),
					]),
				);
			}

			// Apply interactionType filter
			if (args.interactionType) {
				query = query.where(
					"type",
					"=",
					CrmInteractionType[args.interactionType],
				);
			}

			// Apply contactId filter
			if (args.contactId) {
				query = query.where("contactId", "=", args.contactId);
			}

			// Apply createdBy filter (userId)
			if (args.createdBy) {
				query = query.where("userId", "=", args.createdBy);
			}

			// Apply sorting
			if (args.sortBy) {
				const direction =
					args.sortDirection?.toUpperCase() === "DESC" ? "desc" : "asc";
				if (args.sortBy === "createdAt") {
					query = query.orderBy("createdAt", direction);
				} else if (args.sortBy === "interactionDate") {
					query = query.orderBy("interactionDate", direction);
				}
			} else {
				// Default sorting - newest first
				query = query.orderBy("createdAt", "desc");
			}

			const results = await query.execute();
			return results as unknown as Interactions[];
		},
		interaction: async (_parent, args, ctx) => {
			const result = await ctx.db
				.selectFrom("crm.interactions")
				.selectAll()
				.where("id", "=", args.id)
				.executeTakeFirstOrThrow();

			return result as unknown as Interactions;
		},
	};
