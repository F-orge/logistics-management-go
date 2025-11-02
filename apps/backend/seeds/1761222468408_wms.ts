import { DB } from "@packages/graphql/db.types";
import type { Kysely } from "kysely";
import { Faker, base, de, de_AT, en } from "@faker-js/faker";
import {
  seedWmsWarehouse,
  seedWmsLocation,
  seedWmsProduct,
  seedWmsSupplier,
  seedWmsInventoryStock,
  seedWmsInventoryBatch,
  seedWmsInventoryAdjustment,
  seedWmsBinThreshold,
  seedWmsReorderPoint,
  seedWmsInboundShipment,
  seedWmsInboundShipmentItem,
  seedWmsOutboundShipment,
  seedWmsOutboundShipmentItem,
  seedWmsSalesOrder,
  seedWmsSalesOrderItem,
  seedWmsReturn,
  seedWmsReturnItem,
  seedWmsStockTransfer,
  seedWmsPackage,
  seedWmsPackageItem,
  seedWmsTask,
  seedWmsTaskItem,
  seedWmsPickBatch,
  seedWmsPickBatchItem,
  seedWmsPutawayRule,
} from "../src/seeds/wms-helpers";

export async function seed(db: Kysely<DB>): Promise<void> {
  const faker = new Faker({ locale: [de_AT, de, en, base] });

  // Get all users to use as warehouse workers
  const users = await db.selectFrom("user").selectAll().execute();

  if (users.length === 0) {
    console.log("No users found. Please run auth seeds first.");
    return;
  }

  const getRandomUserId = () =>
    users[Math.floor(Math.random() * users.length)].id;

  // Get CRM companies for client references
  const crmCompanies = await db
    .selectFrom("crm.companies")
    .select(["id"])
    .execute();

  // Get CRM opportunities for sales order integration
  const crmOpportunities = await db
    .selectFrom("crm.opportunities")
    .select(["id"])
    .execute();

  // 1. Seed Warehouses (no dependencies)
  console.log("Seeding WMS Warehouses...");
  const warehouseData = Array.from({ length: 10 }, () =>
    seedWmsWarehouse(faker)
  );

  const warehouses = await db
    .insertInto("wms.warehouses")
    .values(warehouseData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${warehouses.length} warehouses`);

  // 2. Seed Suppliers (no dependencies)
  console.log("Seeding WMS Suppliers...");
  const supplierData = Array.from({ length: 50 }, () => seedWmsSupplier(faker));

  const suppliers = await db
    .insertInto("wms.suppliers")
    .values(supplierData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${suppliers.length} suppliers`);

  // 3. Seed Products (depends on suppliers and CRM companies)
  console.log("Seeding WMS Products...");
  const productData = Array.from({ length: 500 }, () => {
    const supplierId = faker.helpers.maybe(
      () => suppliers[Math.floor(Math.random() * suppliers.length)].id,
      { probability: 0.8 }
    );
    // Ensure all products have a client relationship
    const clientId =
      crmCompanies.length > 0
        ? crmCompanies[Math.floor(Math.random() * crmCompanies.length)].id
        : undefined;

    return seedWmsProduct(faker, { supplierId, clientId });
  });

  const products = await db
    .insertInto("wms.products")
    .values(productData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${products.length} products`);

  // 4. Seed Locations (depends on warehouses)
  console.log("Seeding WMS Locations...");
  const locationData: Array<ReturnType<typeof seedWmsLocation>> = [];

  for (const warehouse of warehouses) {
    // Each warehouse has multiple zones, aisles, and bins (reduced counts)
    const zoneCount = faker.number.int({ min: 2, max: 3 });

    for (let z = 0; z < zoneCount; z++) {
      // Create zone
      const zone = seedWmsLocation(faker, { warehouseId: warehouse.id });
      locationData.push(zone);

      // Create aisles in zone
      const aisleCount = faker.number.int({ min: 2, max: 4 });
      for (let a = 0; a < aisleCount; a++) {
        const aisle = seedWmsLocation(faker, {
          warehouseId: warehouse.id,
          parentLocationId: undefined, // Will fix this separately
        });
        locationData.push(aisle);

        // Create bins in aisle
        const binCount = faker.number.int({ min: 3, max: 6 });
        for (let b = 0; b < binCount; b++) {
          const bin = seedWmsLocation(faker, {
            warehouseId: warehouse.id,
            parentLocationId: undefined, // Will fix this separately
          });
          locationData.push(bin);
        }
      }
    }
  }

  const locations = await db
    .insertInto("wms.locations")
    .values(locationData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${locations.length} locations`);

  // 5. Seed Inventory Batches (depends on products)
  console.log("Seeding WMS Inventory Batches...");
  const inventoryBatchData: Array<ReturnType<typeof seedWmsInventoryBatch>> =
    [];

  for (const product of products) {
    // Each product has 1-3 batches
    const batchCount = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < batchCount; i++) {
      inventoryBatchData.push(
        seedWmsInventoryBatch(faker, { productId: product.id })
      );
    }
  }

  const inventoryBatches = await db
    .insertInto("wms.inventoryBatches")
    .values(inventoryBatchData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${inventoryBatches.length} inventory batches`);

  // 6. Seed Inventory Stock (depends on products, locations, and batches)
  console.log("Seeding WMS Inventory Stock...");
  const inventoryStockData: Array<ReturnType<typeof seedWmsInventoryStock>> =
    [];

  // Create inventory for random product/location combinations
  for (let i = 0; i < 2000; i++) {
    const product = products[Math.floor(Math.random() * products.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const batch = faker.helpers.maybe(
      () =>
        inventoryBatches.filter((b) => b.productId === product.id)[
          Math.floor(
            Math.random() *
              inventoryBatches.filter((b) => b.productId === product.id).length
          )
        ]?.id,
      { probability: 0.7 }
    );

    inventoryStockData.push(
      seedWmsInventoryStock(faker, {
        productId: product.id,
        locationId: location.id,
        batchId: batch,
      })
    );
  }

  const inventoryStock = await db
    .insertInto("wms.inventoryStock")
    .values(inventoryStockData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${inventoryStock.length} inventory stock records`);

  // 7. Seed Inventory Adjustments (depends on products and users)
  console.log("Seeding WMS Inventory Adjustments...");
  const inventoryAdjustmentData = Array.from({ length: 300 }, () => {
    const product = products[Math.floor(Math.random() * products.length)];
    const warehouse = warehouses[Math.floor(Math.random() * warehouses.length)];

    return seedWmsInventoryAdjustment(faker, {
      productId: product.id,
      userId: getRandomUserId(),
      warehouseId: warehouse.id,
    });
  });

  const inventoryAdjustments = await db
    .insertInto("wms.inventoryAdjustments")
    .values(inventoryAdjustmentData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${inventoryAdjustments.length} inventory adjustments`);

  // 8. Seed Bin Thresholds (depends on products and locations)
  console.log("Seeding WMS Bin Thresholds...");
  const binThresholdData = Array.from({ length: 400 }, () => {
    const product = products[Math.floor(Math.random() * products.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];

    return seedWmsBinThreshold(faker, {
      productId: product.id,
      locationId: location.id,
    });
  });

  const binThresholds = await db
    .insertInto("wms.binThresholds")
    .values(binThresholdData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${binThresholds.length} bin thresholds`);

  // 9. Seed Reorder Points (depends on products and warehouses)
  console.log("Seeding WMS Reorder Points...");
  const reorderPointData = Array.from({ length: 200 }, () => {
    const product = products[Math.floor(Math.random() * products.length)];
    const warehouse = warehouses[Math.floor(Math.random() * warehouses.length)];

    return seedWmsReorderPoint(faker, {
      productId: product.id,
      warehouseId: warehouse.id,
    });
  });

  const reorderPoints = await db
    .insertInto("wms.reorderPoints")
    .values(reorderPointData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${reorderPoints.length} reorder points`);

  // 10. Seed Inbound Shipments (depends on warehouses)
  console.log("Seeding WMS Inbound Shipments...");
  const inboundShipmentData = Array.from({ length: 150 }, () => {
    const warehouse = warehouses[Math.floor(Math.random() * warehouses.length)];
    const clientId = faker.helpers.maybe(
      () => crmCompanies[Math.floor(Math.random() * crmCompanies.length)]?.id,
      { probability: 0.8 }
    );

    return seedWmsInboundShipment(faker, {
      warehouseId: warehouse.id,
      clientId,
    });
  });

  const inboundShipments = await db
    .insertInto("wms.inboundShipments")
    .values(inboundShipmentData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${inboundShipments.length} inbound shipments`);

  // 11. Seed Inbound Shipment Items (depends on inbound shipments and products)
  console.log("Seeding WMS Inbound Shipment Items...");
  const inboundShipmentItemData: Array<
    ReturnType<typeof seedWmsInboundShipmentItem>
  > = [];

  for (const shipment of inboundShipments) {
    // Each inbound shipment has 1-8 product items
    const itemCount = faker.number.int({ min: 1, max: 8 });
    for (let i = 0; i < itemCount; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      inboundShipmentItemData.push(
        seedWmsInboundShipmentItem(faker, {
          inboundShipmentId: shipment.id,
          productId: product.id,
        })
      );
    }
  }

  const inboundShipmentItems = await db
    .insertInto("wms.inboundShipmentItems")
    .values(inboundShipmentItemData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${inboundShipmentItems.length} inbound shipment items`);

  // 12. Seed Sales Orders (requires CRM companies and opportunities)
  console.log("Seeding WMS Sales Orders...");
  const salesOrderData = Array.from({ length: 200 }, () => {
    // Require a valid client ID
    const clientId =
      crmCompanies.length > 0
        ? crmCompanies[Math.floor(Math.random() * crmCompanies.length)].id
        : (() => {
            throw new Error("No CRM companies available for sales orders");
          })();

    // Link to CRM opportunities more frequently
    const crmOpportunityId =
      crmOpportunities.length > 0
        ? faker.helpers.maybe(
            () =>
              crmOpportunities[
                Math.floor(Math.random() * crmOpportunities.length)
              ].id,
            { probability: 0.8 }
          )
        : undefined;

    return seedWmsSalesOrder(faker, { clientId, crmOpportunityId });
  });

  const salesOrders = await db
    .insertInto("wms.salesOrders")
    .values(salesOrderData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${salesOrders.length} sales orders`);

  // 13. Seed Sales Order Items (depends on sales orders and products)
  console.log("Seeding WMS Sales Order Items...");
  const salesOrderItemData: Array<ReturnType<typeof seedWmsSalesOrderItem>> =
    [];

  for (const salesOrder of salesOrders) {
    // Each sales order has 1-6 product items
    const itemCount = faker.number.int({ min: 1, max: 6 });
    for (let i = 0; i < itemCount; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      salesOrderItemData.push(
        seedWmsSalesOrderItem(faker, {
          salesOrderId: salesOrder.id,
          productId: product.id,
        })
      );
    }
  }

  const salesOrderItems = await db
    .insertInto("wms.salesOrderItems")
    .values(salesOrderItemData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${salesOrderItems.length} sales order items`);

  // 14. Seed Outbound Shipments (depends on warehouses, sales orders, and CRM companies)
  console.log("Seeding WMS Outbound Shipments...");
  const outboundShipmentData = Array.from({ length: 180 }, () => {
    const warehouse = warehouses[Math.floor(Math.random() * warehouses.length)];
    // Ensure every outbound shipment has a valid sales order
    const salesOrderId =
      salesOrders.length > 0
        ? salesOrders[Math.floor(Math.random() * salesOrders.length)].id
        : (() => {
            throw new Error("No sales orders available for outbound shipments");
          })();

    const clientId =
      crmCompanies.length > 0
        ? crmCompanies[Math.floor(Math.random() * crmCompanies.length)].id
        : undefined;

    return seedWmsOutboundShipment(faker, {
      warehouseId: warehouse.id,
      clientId,
      salesOrderId,
    });
  });

  const outboundShipments = await db
    .insertInto("wms.outboundShipments")
    .values(outboundShipmentData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${outboundShipments.length} outbound shipments`);

  // 15. Seed Outbound Shipment Items (depends on outbound shipments, products, and batches)
  console.log("Seeding WMS Outbound Shipment Items...");
  const outboundShipmentItemData: Array<
    ReturnType<typeof seedWmsOutboundShipmentItem>
  > = [];

  for (const shipment of outboundShipments) {
    // Each outbound shipment has 1-5 product items
    const itemCount = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < itemCount; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const batch = faker.helpers.maybe(
        () =>
          inventoryBatches.filter((b) => b.productId === product.id)[
            Math.floor(
              Math.random() *
                inventoryBatches.filter((b) => b.productId === product.id)
                  .length
            )
          ]?.id,
        { probability: 0.6 }
      );
      const salesOrderItem =
        salesOrderItems[Math.floor(Math.random() * salesOrderItems.length)].id;

      outboundShipmentItemData.push(
        seedWmsOutboundShipmentItem(faker, {
          outboundShipmentId: shipment.id,
          productId: product.id,
          batchId: batch,
          salesOrderItemId: salesOrderItem,
        })
      );
    }
  }

  const outboundShipmentItems = await db
    .insertInto("wms.outboundShipmentItems")
    .values(outboundShipmentItemData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${outboundShipmentItems.length} outbound shipment items`);

  // 16. Seed Pick Batches (depends on warehouses and users)
  console.log("Seeding WMS Pick Batches...");
  const pickBatchData = Array.from({ length: 80 }, () => {
    const warehouse = warehouses[Math.floor(Math.random() * warehouses.length)];
    const assignedUserId = faker.helpers.maybe(() => getRandomUserId(), {
      probability: 0.7,
    });
    const waveId = faker.helpers.maybe(() => faker.string.uuid(), {
      probability: 0.4,
    });

    return seedWmsPickBatch(faker, {
      warehouseId: warehouse.id,
      assignedUserId,
      waveId,
    });
  });

  const pickBatches = await db
    .insertInto("wms.pickBatches")
    .values(pickBatchData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${pickBatches.length} pick batches`);

  // 17. Seed Pick Batch Items (depends on pick batches and sales orders)
  console.log("Seeding WMS Pick Batch Items...");
  const pickBatchItemData: Array<ReturnType<typeof seedWmsPickBatchItem>> = [];

  for (const pickBatch of pickBatches) {
    // Each pick batch has 3-12 sales orders
    const itemCount = faker.number.int({ min: 3, max: 12 });
    for (let i = 0; i < itemCount; i++) {
      const salesOrder =
        salesOrders[Math.floor(Math.random() * salesOrders.length)];
      pickBatchItemData.push(
        seedWmsPickBatchItem(faker, {
          pickBatchId: pickBatch.id,
          salesOrderId: salesOrder.id,
        })
      );
    }
  }

  const pickBatchItems = await db
    .insertInto("wms.pickBatchItems")
    .values(pickBatchItemData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${pickBatchItems.length} pick batch items`);

  // 18. Seed Tasks (depends on warehouses, users, and pick batches)
  console.log("Seeding WMS Tasks...");
  const taskData = Array.from({ length: 400 }, () => {
    const warehouse = warehouses[Math.floor(Math.random() * warehouses.length)];
    const assignedUserId = getRandomUserId();
    const location = faker.helpers.maybe(
      () => locations[Math.floor(Math.random() * locations.length)].id,
      { probability: 0.8 }
    );
    const pickBatch = faker.helpers.maybe(
      () => pickBatches[Math.floor(Math.random() * pickBatches.length)].id,
      { probability: 0.4 }
    );

    return seedWmsTask(faker, {
      warehouseId: warehouse.id,
      assignedUserId,
      locationId: location,
      pickBatchId: pickBatch,
      sourceEntityId: faker.helpers.maybe(() => faker.string.uuid(), {
        probability: 0.6,
      }),
      sourceEntityType: faker.helpers.maybe(
        () =>
          faker.helpers.arrayElement([
            "inbound_shipment",
            "sales_order",
            "stock_transfer",
          ]),
        { probability: 0.6 }
      ),
    });
  });

  const tasks = await db
    .insertInto("wms.tasks")
    .values(taskData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${tasks.length} tasks`);

  // 19. Seed Task Items (depends on tasks, products, locations, and batches)
  console.log("Seeding WMS Task Items...");
  const taskItemData: Array<ReturnType<typeof seedWmsTaskItem>> = [];

  for (const task of tasks) {
    // Each task has 1-4 items
    const itemCount = faker.number.int({ min: 1, max: 4 });
    for (let i = 0; i < itemCount; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const fromLocation = faker.helpers.maybe(
        () => locations[Math.floor(Math.random() * locations.length)].id,
        { probability: 0.8 }
      );
      const toLocation = faker.helpers.maybe(
        () => locations[Math.floor(Math.random() * locations.length)].id,
        { probability: 0.8 }
      );
      const batch = faker.helpers.maybe(
        () =>
          inventoryBatches[Math.floor(Math.random() * inventoryBatches.length)]
            .id,
        { probability: 0.5 }
      );

      taskItemData.push(
        seedWmsTaskItem(faker, {
          taskId: task.id,
          productId: product.id,
          fromLocationId: fromLocation,
          toLocationId: toLocation,
          batchId: batch,
        })
      );
    }
  }

  const taskItems = await db
    .insertInto("wms.taskItems")
    .values(taskItemData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${taskItems.length} task items`);

  // 20. Seed Returns (depends on sales orders)
  console.log("Seeding WMS Returns...");
  const returnData = Array.from({ length: 50 }, () => {
    const clientId =
      crmCompanies[Math.floor(Math.random() * crmCompanies.length)].id;
    const salesOrder = faker.helpers.maybe(
      () => salesOrders[Math.floor(Math.random() * salesOrders.length)].id,
      { probability: 0.8 }
    );

    return seedWmsReturn(faker, { clientId, salesOrderId: salesOrder });
  });

  const returns = await db
    .insertInto("wms.returns")
    .values(returnData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${returns.length} returns`);

  // 21. Seed Return Items (depends on returns and products)
  console.log("Seeding WMS Return Items...");
  const returnItemData: Array<ReturnType<typeof seedWmsReturnItem>> = [];

  for (const returnRecord of returns) {
    // Each return has 1-3 items
    const itemCount = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < itemCount; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      returnItemData.push(
        seedWmsReturnItem(faker, {
          returnId: returnRecord.id,
          productId: product.id,
        })
      );
    }
  }

  const returnItems = await db
    .insertInto("wms.returnItems")
    .values(returnItemData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${returnItems.length} return items`);

  // 22. Seed Stock Transfers (depends on products and warehouses)
  console.log("Seeding WMS Stock Transfers...");
  const stockTransferData = Array.from({ length: 100 }, () => {
    const product = products[Math.floor(Math.random() * products.length)];
    const sourceWarehouse =
      warehouses[Math.floor(Math.random() * warehouses.length)];
    let destinationWarehouse =
      warehouses[Math.floor(Math.random() * warehouses.length)];

    // Ensure different warehouses
    while (
      destinationWarehouse.id === sourceWarehouse.id &&
      warehouses.length > 1
    ) {
      destinationWarehouse =
        warehouses[Math.floor(Math.random() * warehouses.length)];
    }

    return seedWmsStockTransfer(faker, {
      productId: product.id,
      sourceWarehouseId: sourceWarehouse.id,
      destinationWarehouseId: destinationWarehouse.id,
    });
  });

  const stockTransfers = await db
    .insertInto("wms.stockTransfers")
    .values(stockTransferData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${stockTransfers.length} stock transfers`);

  // 23. Seed Packages (depends on sales orders and warehouses)
  console.log("Seeding WMS Packages...");
  const packageData = Array.from({ length: 150 }, () => {
    const salesOrder =
      salesOrders[Math.floor(Math.random() * salesOrders.length)];
    const warehouse = warehouses[Math.floor(Math.random() * warehouses.length)];
    const packedByUserId = faker.helpers.maybe(() => getRandomUserId(), {
      probability: 0.8,
    });

    return seedWmsPackage(faker, {
      salesOrderId: salesOrder.id,
      warehouseId: warehouse.id,
      packedByUserId,
    });
  });

  const packages = await db
    .insertInto("wms.packages")
    .values(packageData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${packages.length} packages`);

  // 24. Seed Package Items (depends on packages, products, and batches)
  console.log("Seeding WMS Package Items...");
  const packageItemData: Array<ReturnType<typeof seedWmsPackageItem>> = [];

  for (const packageRecord of packages) {
    // Each package has 1-5 items
    const itemCount = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < itemCount; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const batch = faker.helpers.maybe(
        () =>
          inventoryBatches[Math.floor(Math.random() * inventoryBatches.length)]
            .id,
        { probability: 0.6 }
      );

      packageItemData.push(
        seedWmsPackageItem(faker, {
          packageId: packageRecord.id,
          productId: product.id,
          batchId: batch,
        })
      );
    }
  }

  const packageItems = await db
    .insertInto("wms.packageItems")
    .values(packageItemData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${packageItems.length} package items`);

  // 25. Seed Putaway Rules (depends on products, warehouses, and locations)
  console.log("Seeding WMS Putaway Rules...");
  const putawayRuleData = Array.from({ length: 200 }, () => {
    const product = products[Math.floor(Math.random() * products.length)];
    const warehouse = warehouses[Math.floor(Math.random() * warehouses.length)];
    const clientId = faker.helpers.maybe(
      () => crmCompanies[Math.floor(Math.random() * crmCompanies.length)]?.id,
      { probability: 0.6 }
    );
    const preferredLocation = faker.helpers.maybe(
      () => locations[Math.floor(Math.random() * locations.length)].id,
      { probability: 0.7 }
    );

    return seedWmsPutawayRule(faker, {
      productId: product.id,
      warehouseId: warehouse.id,
      clientId,
      preferredLocationId: preferredLocation,
    });
  });

  const putawayRules = await db
    .insertInto("wms.putawayRules")
    .values(putawayRuleData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${putawayRules.length} putaway rules`);

  console.log("WMS seeding completed successfully!");
}
