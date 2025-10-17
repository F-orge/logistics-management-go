import { implement } from "@orpc/server";
import type { ORPCContext } from "@/index";
import { nonEmpty } from "@packages/db/utils";
import * as contracts from "@packages/rpc/contracts/wms/sales_order";
import {
  ProductRepository,
  SalesOrderItemRepository,
  SalesOrderRepository,
} from "@packages/db/repositories/wms";
import {
  CompanyRepository,
  OpportunityRepository,
} from "@packages/db/repositories/crm";

async function getSalesOrder(context: ORPCContext, id: string) {
  const repo = SalesOrderRepository.fns(context.kysely);
  const result = await repo.find(id);

  const [client, opportunity, items] = await Promise.all([
    CompanyRepository.fns(context.kysely).find(result.clientId),
    OpportunityRepository.fns(context.kysely).find(
      result.crmOpportunityId || ""
    ),
    SalesOrderItemRepository.fns(context.kysely).paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: "salesOrderId", operator: "in", value: [id] }],
    }),
  ]);

  const productIds = items.map((i) => i.productId);
  const products = await ProductRepository.fns(context.kysely).any(productIds);
  const productMap = new Map(products.map((p) => [p.id, p]));

  return {
    ...result,
    client: client!,
    opportunity: opportunity,
    items: items.map((item) => ({
      ...item,
      product: productMap.get(item.productId)!,
    })),
  };
}

export const PaginateSalesOrder = implement(
  contracts.PaginateSalesOrderContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SalesOrderRepository.fns(context.kysely);
    const result = await repo.paginate(input);
    if (result.length === 0) {
      return [];
    }

    return Promise.all(result.map((r) => getSalesOrder(context, r.id)));
  });

export const RangeSalesOrder = implement(contracts.RangeSalesOrderContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SalesOrderRepository.fns(context.kysely);
    const result = await repo.range(input);
    if (result.length === 0) {
      return [];
    }

    return Promise.all(result.map((r) => getSalesOrder(context, r.id)));
  });

export const AnySalesOrder = implement(contracts.AnySalesOrderContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SalesOrderRepository.fns(context.kysely);
    const result = await repo.any(input);
    if (result.length === 0) {
      return [];
    }

    return Promise.all(result.map((r) => getSalesOrder(context, r.id)));
  });

export const InsertSalesOrder = implement(contracts.InsertSalesOrderContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const { items, ...data } = input;
    const repo = SalesOrderRepository.fns(context.kysely);
    const result = await repo.insert(data);

    await SalesOrderItemRepository.fns(context.kysely).insertMany(
      items.map((item) => ({ ...item, salesOrderId: result.id }))
    );

    return getSalesOrder(context, result.id);
  });

export const InsertManySalesOrder = implement(
  contracts.InsertManySalesOrderContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SalesOrderRepository.fns(context.kysely);
    const result = await repo.insertMany(input.map(({ items, ...d }) => d));
    const allItems = input.flatMap((d, i) =>
      d.items.map((item) => ({ ...item, salesOrderId: result[i].id }))
    );
    await SalesOrderItemRepository.fns(context.kysely).insertMany(allItems);

    return Promise.all(result.map((r) => getSalesOrder(context, r.id)));
  });

export const UpdateSalesOrder = implement(contracts.UpdateSalesOrderContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SalesOrderRepository.fns(context.kysely);
    await repo.update(input.id, input.value);
    return getSalesOrder(context, input.id);
  });

export const RemoveSalesOrder = implement(contracts.RemoveSalesOrderContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SalesOrderRepository.fns(context.kysely);
    return await repo.remove(input);
  });

export const InsertSalesOrderItem = implement(
  contracts.InsertSalesOrderItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SalesOrderItemRepository.fns(context.kysely);

    const result = await repo.insert(input);

    return getSalesOrder(context, result.salesOrderId);
  });

export const InsertManySalesOrderItem = implement(
  contracts.InsertManySalesOrderItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SalesOrderItemRepository.fns(context.kysely);
    await repo.insertMany(input);
    return await Promise.all(
      input.map((row) => getSalesOrder(context, row.salesOrderId))
    );
  });

export const UpdateSalesOrderItem = implement(
  contracts.UpdateSalesOrderItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SalesOrderItemRepository.fns(context.kysely);
    const result = await repo.update(input.id, input.value);
    return getSalesOrder(context, result.salesOrderId);
  });

export const RemoveSalesOrderItem = implement(
  contracts.RemoveSalesOrderItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SalesOrderItemRepository.fns(context.kysely);
    return repo.remove(input);
  });
