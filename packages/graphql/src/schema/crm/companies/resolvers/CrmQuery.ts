import { GraphQLError } from "graphql";
import type { Companies } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<CrmQueryResolvers, "companies" | "company"> = {
	companies: async (_root, args, ctx) => {
		let query = ctx.db.selectFrom("crm.companies").selectAll();

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
					eb("street", "ilike", `%${args.search}%`),
					eb("city", "ilike", `%${args.search}%`),
					eb("state", "ilike", `%${args.search}%`),
					eb("postalCode", "ilike", `%${args.search}%`),
					eb("country", "ilike", `%${args.search}%`),
					eb("phoneNumber", "ilike", `%${args.search}%`),
					eb("industry", "ilike", `%${args.search}%`),
					eb("website", "ilike", `%${args.search}%`),
				]),
			);
		}
		return query.execute() as unknown as Companies[];
	},

	company: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.companies")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirst();

		if (!result) {
			throw new GraphQLError("Company not found", {
				extensions: {
					code: "NOT_FOUND",
				},
			});
		}

		return result as Companies;
	},
};
