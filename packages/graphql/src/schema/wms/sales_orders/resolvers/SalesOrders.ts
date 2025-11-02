import type {
	Companies,
	Opportunities,
	OutboundShipments,
	Packages,
	PickBatchItems,
	Returns,
	SalesOrderItems,
} from "../../../../zod.schema";
import type { SalesOrdersResolvers } from "./../../../types.generated";
export const SalesOrders: SalesOrdersResolvers = {
	client: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.companies")
			.selectAll("crm.companies")
			.innerJoin(
				"wms.salesOrders",
				"wms.salesOrders.clientId",
				"crm.companies.id",
			)
			.where("wms.salesOrders.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Companies;
	},
	crmOpportunity: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("crm.opportunities")
			.selectAll("crm.opportunities")
			.innerJoin(
				"wms.salesOrders",
				"wms.salesOrders.crmOpportunityId",
				"crm.opportunities.id",
			)
			.where("wms.salesOrders.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as Opportunities;
	},
	items: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.salesOrderItems")
			.selectAll("wms.salesOrderItems")
			.where("wms.salesOrderItems.salesOrderId", "=", parent.id as string)
			.execute();

		return results as unknown as SalesOrderItems[];
	},
	outboundShipments: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.outboundShipments")
			.selectAll("wms.outboundShipments")
			.where("wms.outboundShipments.salesOrderId", "=", parent.id as string)
			.execute();

		return results as unknown as OutboundShipments[];
	},
	returns: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.returns")
			.selectAll("wms.returns")
			.where("wms.returns.salesOrderId", "=", parent.id as string)
			.execute();

		return results as unknown as Returns[];
	},
	pickBatchItems: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.pickBatchItems")
			.selectAll("wms.pickBatchItems")
			.where("wms.pickBatchItems.salesOrderId", "=", parent.id as string)
			.execute();

		return results as unknown as PickBatchItems[];
	},
	packages: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.packages")
			.selectAll("wms.packages")
			.where("wms.packages.salesOrderId", "=", parent.id as string)
			.execute();

		return results as unknown as Packages[];
	},
};
