import {
	CrmOpportunitySource,
	CrmOpportunityStage,
} from "../../../../db.types";
import type { Opportunities } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<
	CrmQueryResolvers,
	"opportunities" | "opportunitiesAnalytics" | "opportunity"
> = {
	opportunities: async (_parent, args, ctx) => {
		let query = ctx.db.selectFrom("crm.opportunities").selectAll();

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
					eb("lostReason", "ilike", `%${args.search}%`),
				]),
			);
		}

		if (args.stage) {
			query = query.where("stage", "=", CrmOpportunityStage[args.stage]);
		}

		if (args.source) {
			query = query.where("source", "=", CrmOpportunitySource[args.source]);
		}

		if (args.amountMin !== undefined && args.amountMin !== null) {
			query = query.where("dealValue", ">=", args.amountMin);
		}

		if (args.amountMax !== undefined && args.amountMax !== null) {
			query = query.where("dealValue", "<=", args.amountMax);
		}

		if (args.closeDateFrom && args.closeDateTo) {
			query = query
				.where("expectedCloseDate", ">=", args.closeDateFrom as Date)
				.where("expectedCloseDate", "<=", args.closeDateTo as Date);
		}

		if (args.companyId) {
			query = query.where("companyId", "=", args.companyId);
		}

		if (args.ownerId) {
			query = query.where("ownerId", "=", args.ownerId);
		}

		// Apply sorting
		if (args.sortBy && args.sortDirection) {
			const direction =
				args.sortDirection.toUpperCase() === "DESC" ? "desc" : "asc";
			if (args.sortBy === "amount" || args.sortBy === "dealValue") {
				query = query.orderBy("dealValue", direction);
			} else if (args.sortBy === "createdAt") {
				query = query.orderBy("createdAt", direction);
			} else if (args.sortBy === "expectedCloseDate") {
				query = query.orderBy("expectedCloseDate", direction);
			}
		} else {
			// Default sort by createdAt DESC
			query = query.orderBy("createdAt", "desc");
		}

		const results = await query.execute();
		return results as unknown as Opportunities[];
	},
	opportunity: async (_parent, args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.opportunities")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return result as unknown as Opportunities;
	},
	opportunitiesAnalytics: async (_parent, _args, ctx) => {
		// Get count by stage
		const countByStageResults = await ctx.db
			.selectFrom("crm.opportunities")
			.select("stage")
			.select((eb) => eb.fn.count<number>("id").as("count"))
			.groupBy("stage")
			.execute();

		const countByStage = countByStageResults.map((row) => ({
			stage: row.stage || "UNKNOWN",
			count: Number(row.count),
		}));

		// Get total revenue by stage
		const revenueByStageResults = await ctx.db
			.selectFrom("crm.opportunities")
			.select("stage")
			.select((eb) => eb.fn.sum<number>("dealValue").as("revenue"))
			.groupBy("stage")
			.execute();

		const totalRevenueByStage = revenueByStageResults.map((row) => ({
			stage: row.stage || "UNKNOWN",
			revenue: Number(row.revenue || 0),
		}));

		// Calculate win rate (CLOSED_WON / (CLOSED_WON + CLOSED_LOST))
		const closedWon = countByStageResults.find((r) => r.stage === "CLOSED_WON");
		const closedLost = countByStageResults.find(
			(r) => r.stage === "CLOSED_LOST",
		);
		const closedWonCount = closedWon ? Number(closedWon.count) : 0;
		const closedLostCount = closedLost ? Number(closedLost.count) : 0;
		const totalClosed = closedWonCount + closedLostCount;
		const winRate = totalClosed > 0 ? (closedWonCount / totalClosed) * 100 : 0;

		// Calculate average deal size
		const avgResult = await ctx.db
			.selectFrom("crm.opportunities")
			.select((eb) => eb.fn.avg<number>("dealValue").as("avg"))
			.executeTakeFirst();

		const averageDealSize =
			avgResult && avgResult.avg ? Number(avgResult.avg) : 0;

		return {
			countByStage,
			totalRevenueByStage,
			winRate,
			averageDealSize,
		};
	},
};
