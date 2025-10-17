import { implement } from "@orpc/server";
import type { ORPCContext } from "@/index";
import { nonEmpty } from "@packages/db/utils";
import * as contracts from "@packages/rpc/contracts/wms/package";
import {
  PackageItemRepository,
  PackageRepository,
  ProductRepository,
  SalesOrderRepository,
  SupplierRepository,
  WarehouseRepository,
} from "@packages/db/repositories/wms";
import {
  CompanyRepository,
  OpportunityRepository,
} from "@packages/db/repositories/crm";
import { UserRepository } from "@packages/db/repositories/auth";

async function getPackage(context: ORPCContext, id: string) {
  const repo = PackageRepository.fns(context.kysely);
  const result = await repo.find(id);

  const [salesOrder, warehouse, packedByUser, items] = await Promise.all([
    SalesOrderRepository.fns(context.kysely).find(result.salesOrderId),
    WarehouseRepository.fns(context.kysely).find(result.warehouseId),
    result.packedByUserId
      ? UserRepository.fns(context.kysely).find(result.packedByUserId)
      : undefined,
    PackageItemRepository.fns(context.kysely).paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: "packageId", operator: "in", value: [id] }],
    }),
  ]);

  const [client, opportunity] = await Promise.all([
    CompanyRepository.fns(context.kysely).find(salesOrder!.clientId),
    salesOrder!.crmOpportunityId
      ? OpportunityRepository.fns(context.kysely).find(
          salesOrder!.crmOpportunityId
        )
      : undefined,
  ]);

  const productIds = items.map((i) => i.productId);
  const products = await ProductRepository.fns(context.kysely).any(productIds);
  const productMap = new Map(products.map((p) => [p.id, p]));

  const supplierIds = products.map((p) => p.supplierId).filter(nonEmpty);
  const suppliers = await SupplierRepository.fns(context.kysely).any(
    supplierIds
  );
  const supplierMap = new Map(suppliers.map((s) => [s.id, s]));

  return {
    ...result,
    salesOrder: {
      ...salesOrder!,
      client: client!,
      opportunity,
    },
    warehouse: warehouse!,
    packedByUser,
    items: items.map((item) => {
      const product = productMap.get(item.productId);
      const supplier = product?.supplierId
        ? supplierMap.get(product.supplierId)
        : undefined;
      return {
        ...item,
        product: {
          ...product!,
          supplier,
        },
      };
    }),
  };
}

export const PaginatePackage = implement(contracts.PaginatePackageContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PackageRepository.fns(context.kysely);
    const result = await repo.paginate(input);
    if (result.length === 0) {
      return [];
    }

    return Promise.all(result.map((r) => getPackage(context, r.id)));
  });

export const RangePackage = implement(contracts.RangePackageContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PackageRepository.fns(context.kysely);
    const result = await repo.range(input);
    if (result.length === 0) {
      return [];
    }

    return Promise.all(result.map((r) => getPackage(context, r.id)));
  });

export const AnyPackage = implement(contracts.AnyPackageContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PackageRepository.fns(context.kysely);
    const result = await repo.any(input);
    if (result.length === 0) {
      return [];
    }

    return Promise.all(result.map((r) => getPackage(context, r.id)));
  });

export const InsertPackage = implement(contracts.InsertPackageContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const { items, ...data } = input;
    const repo = PackageRepository.fns(context.kysely);
    const result = await repo.insert(data);

    await PackageItemRepository.fns(context.kysely).insertMany(
      items.map((item) => ({ ...item, packageId: result.id }))
    );

    return getPackage(context, result.id);
  });

export const InsertManyPackage = implement(contracts.InsertManyPackageContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PackageRepository.fns(context.kysely);
    const result = await repo.insertMany(input.map(({ items, ...d }) => d));
    const allItems = input.flatMap((d, i) =>
      d.items.map((item) => ({ ...item, packageId: result[i].id }))
    );
    await PackageItemRepository.fns(context.kysely).insertMany(allItems);

    return Promise.all(result.map((r) => getPackage(context, r.id)));
  });

export const UpdatePackage = implement(contracts.UpdatePackageContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PackageRepository.fns(context.kysely);
    await repo.update(input.id, input.value);
    return getPackage(context, input.id);
  });

export const RemovePackage = implement(contracts.RemovePackageContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PackageRepository.fns(context.kysely);
    return await repo.remove(input);
  });

export const InsertPackageItem = implement(contracts.InsertPackageItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PackageItemRepository.fns(context.kysely);
    const newItem = await repo.insert(input);
    return getPackage(context, newItem.packageId);
  });

export const InsertManyPackageItem = implement(
  contracts.InsertManyPackageItemContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PackageItemRepository.fns(context.kysely);
    await repo.insertMany(input);
    return await Promise.all(
      input.map((row) => getPackage(context, row.packageId))
    );
  });

export const UpdatePackageItem = implement(contracts.UpdatePackageItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PackageItemRepository.fns(context.kysely);
    const updatedItem = await repo.update(input.id, input.value);
    return getPackage(context, updatedItem.packageId);
  });

export const RemovePackageItem = implement(contracts.RemovePackageItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PackageItemRepository.fns(context.kysely);
    const removed = await repo.remove(input);
    return removed;
  });
