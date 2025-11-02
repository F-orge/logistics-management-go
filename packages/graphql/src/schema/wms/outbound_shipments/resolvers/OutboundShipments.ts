import type {
	OutboundShipmentItems,
	SalesOrders,
} from "../../../../zod.schema";
import type { OutboundShipmentsResolvers } from "./../../../types.generated";
export const OutboundShipments: OutboundShipmentsResolvers = {
	salesOrder: async (parent, _args, ctx) => {
		const result = await ctx.db
			.selectFrom("wms.salesOrders")
			.selectAll("wms.salesOrders")
			.innerJoin(
				"wms.outboundShipments",
				"wms.outboundShipments.salesOrderId",
				"wms.salesOrders.id",
			)
			.where("wms.outboundShipments.id", "=", parent.id as string)
			.executeTakeFirst();

		return result as unknown as SalesOrders;
	},
	items: async (parent, _args, ctx) => {
		const results = await ctx.db
			.selectFrom("wms.outboundShipmentItems")
			.selectAll("wms.outboundShipmentItems")
			.where(
				"wms.outboundShipmentItems.outboundShipmentId",
				"=",
				parent.id as string,
			)
			.execute();

		return results as unknown as OutboundShipmentItems[];
	},
};
