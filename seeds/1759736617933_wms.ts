import { base, de, de_AT, en, Faker } from '@faker-js/faker'
import type { Kysely } from 'kysely'
import { DB, WmsTaskTypeEnum } from '@/db/types'
import { WmsBinThresholdRepository } from '@/repositories/wms/binThresholds'
import { WmsInboundShipmentItemRepository } from '@/repositories/wms/inboundShipmentItems'
import { WmsInboundShipmentRepository } from '@/repositories/wms/inboundShipments'
import { WmsInventoryAdjustmentRepository } from '@/repositories/wms/inventoryAdjustments'
import { WmsInventoryBatchRepository } from '@/repositories/wms/inventoryBatches'
import { WmsInventoryStockRepository } from '@/repositories/wms/inventoryStocks'
import { WmsLocationRepository } from '@/repositories/wms/locations'
import { WmsOutboundShipmentItemRepository } from '@/repositories/wms/outboundShipmentItems'
import { WmsOutboundShipmentRepository } from '@/repositories/wms/outboundShipments'
import { WmsPackageItemRepository } from '@/repositories/wms/packageItems'
import { WmsPackageRepository } from '@/repositories/wms/packages'
import { WmsPickBatchRepository } from '@/repositories/wms/pickBatches'
import { WmsPickBatchItemRepository } from '@/repositories/wms/pickBatchItems'
import { WmsProductRepository } from '@/repositories/wms/products'
import { WmsPutawayRuleRepository } from '@/repositories/wms/putawayRules'
import { WmsReorderPointRepository } from '@/repositories/wms/reorderPoints'
import { WmsReturnItemRepository } from '@/repositories/wms/returnItems'
import { WmsReturnRepository } from '@/repositories/wms/returns'
import { WmsSalesOrderItemRepository } from '@/repositories/wms/salesOrderItems'
import { WmsSalesOrderRepository } from '@/repositories/wms/salesOrders'
import { WmsStockTransferRepository } from '@/repositories/wms/stockTransfers'
import { WmsSupplierRepository } from '@/repositories/wms/suppliers'
import { WmsTaskItemRepository } from '@/repositories/wms/taskItems'
import { WmsTaskRepository } from '@/repositories/wms/tasks'
import { WmsWarehouseRepository } from '@/repositories/wms/warehouses'
import {
  generateWmsBinThreshold,
  generateWmsInboundShipment,
  generateWmsInboundShipmentItem,
  generateWmsInventoryAdjustment,
  generateWmsInventoryBatch,
  generateWmsInventoryStock,
  generateWmsLocation,
  generateWmsOutboundShipment,
  generateWmsOutboundShipmentItem,
  generateWmsPackage,
  generateWmsPackageItem,
  generateWmsPickBatch,
  generateWmsPickBatchItem,
  generateWmsProduct,
  generateWmsPutawayRule,
  generateWmsReorderPoint,
  generateWmsReturn,
  generateWmsReturnItem,
  generateWmsSalesOrder,
  generateWmsSalesOrderItem,
  generateWmsStockTransfer,
  generateWmsSupplier,
  generateWmsTask,
  generateWmsTaskItem,
  generateWmsWarehouse,
} from '@/seeds/wms-helpers'

export async function seed(db: Kysely<DB>): Promise<void> {
  const faker = new Faker({ locale: [de_AT, de, en, base] })

  // Initialize repositories
  const warehouseRepo = new WmsWarehouseRepository(db)
  const supplierRepo = new WmsSupplierRepository(db)
  const productRepo = new WmsProductRepository(db)
  const locationRepo = new WmsLocationRepository(db)
  const inventoryBatchRepo = new WmsInventoryBatchRepository(db)
  const inventoryStockRepo = new WmsInventoryStockRepository(db)
  const salesOrderRepo = new WmsSalesOrderRepository(db)
  const salesOrderItemRepo = new WmsSalesOrderItemRepository(db)
  const inboundShipmentRepo = new WmsInboundShipmentRepository(db)
  const inboundShipmentItemRepo = new WmsInboundShipmentItemRepository(db)
  const outboundShipmentRepo = new WmsOutboundShipmentRepository(db)
  const outboundShipmentItemRepo = new WmsOutboundShipmentItemRepository(db)
  const packageRepo = new WmsPackageRepository(db)
  const packageItemRepo = new WmsPackageItemRepository(db)
  const pickBatchRepo = new WmsPickBatchRepository(db)
  const pickBatchItemRepo = new WmsPickBatchItemRepository(db)
  const taskRepo = new WmsTaskRepository(db)
  const taskItemRepo = new WmsTaskItemRepository(db)
  const binThresholdRepo = new WmsBinThresholdRepository(db)
  const putawayRuleRepo = new WmsPutawayRuleRepository(db)
  const reorderPointRepo = new WmsReorderPointRepository(db)
  const returnRepo = new WmsReturnRepository(db)
  const returnItemRepo = new WmsReturnItemRepository(db)
  const stockTransferRepo = new WmsStockTransferRepository(db)
  const inventoryAdjustmentRepo = new WmsInventoryAdjustmentRepository(db)

  console.log('📦 Starting WMS seed data generation...')

  // Get existing users for client assignments and user references
  const users = await db.selectFrom('user').select(['id']).execute()
  if (users.length === 0) {
    console.log('⚠️  No users found. Please run auth seed first.')
    return
  }

  const userIds = users.map((u) => u.id)
  console.log(`📊 Found ${userIds.length} users for WMS data`)

  // Get existing CRM opportunities for sales order linking
  const crmOpportunities = await db.selectFrom('crm.opportunities').select(['id']).execute()
  console.log(`📊 Found ${crmOpportunities.length} CRM opportunities for sales order linking`)

  // Get existing CRM companies to use as clients
  const crmCompanies = await db.selectFrom('crm.companies').select(['id']).execute()
  console.log(`📊 Found ${crmCompanies.length} CRM companies to use as clients`)

  // 1. Create warehouses
  console.log('🏢 Creating warehouses...')
  const warehouseData = Array.from({ length: 8 }, () => generateWmsWarehouse(faker))
  const warehouses = await warehouseRepo
    .batchCreate(warehouseData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${warehouses.length} warehouses`)

  // 2. Create suppliers
  console.log('🏭 Creating suppliers...')
  const supplierData = Array.from({ length: 20 }, () => generateWmsSupplier(faker))
  const suppliers = await supplierRepo
    .batchCreate(supplierData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${suppliers.length} suppliers`)

  // 3. Create products
  console.log('📦 Creating products...')
  const productData = Array.from({ length: 200 }, () => {
    const clientId =
      Math.random() > 0.2 && crmCompanies.length > 0
        ? faker.helpers.arrayElement(crmCompanies).id
        : undefined
    const supplierId = Math.random() > 0.3 ? faker.helpers.arrayElement(suppliers).id : undefined
    return generateWmsProduct(faker, clientId, supplierId)
  })
  const products = await productRepo
    .batchCreate(productData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${products.length} products`)

  // 4. Create locations
  console.log('📍 Creating locations...')
  const locationData: Array<ReturnType<typeof generateWmsLocation>> = []

  // Create main zones first, then sub-locations
  warehouses.forEach((warehouse) => {
    // Create main zones (no parent)
    const mainZoneCount = faker.number.int({ min: 3, max: 6 })
    const mainZones: Array<{ id: string; warehouseId: string }> = []

    for (let i = 0; i < mainZoneCount; i++) {
      const location = generateWmsLocation(faker, warehouse.id, undefined)
      locationData.push(location)
      // We'll need to track these for sub-locations, but since we don't have IDs yet,
      // we'll create sub-locations in a second batch
    }
  })

  const locations = await locationRepo
    .batchCreate(locationData)
    .onConflict((oc) => oc.doNothing())
    .execute()

  // Create sub-locations that reference main locations
  const subLocationData: Array<ReturnType<typeof generateWmsLocation>> = []
  locations.slice(0, Math.floor(locations.length * 0.6)).forEach((parentLocation) => {
    const subLocationCount = faker.number.int({ min: 2, max: 8 })
    for (let i = 0; i < subLocationCount; i++) {
      subLocationData.push(
        generateWmsLocation(faker, parentLocation.warehouseId, parentLocation.id),
      )
    }
  })

  const subLocations = await locationRepo
    .batchCreate(subLocationData)
    .onConflict((oc) => oc.doNothing())
    .execute()

  const allLocations = [...locations, ...subLocations]
  console.log(
    `✅ Created ${allLocations.length} locations (${locations.length} main + ${subLocations.length} sub)`,
  )

  // 5. Create inventory batches
  console.log('📦 Creating inventory batches...')
  const inventoryBatchData: Array<ReturnType<typeof generateWmsInventoryBatch>> = []
  products.slice(0, 120).forEach((product) => {
    const batchCount = faker.number.int({ min: 1, max: 3 })
    for (let i = 0; i < batchCount; i++) {
      inventoryBatchData.push(generateWmsInventoryBatch(faker, product.id))
    }
  })
  const inventoryBatches = await inventoryBatchRepo
    .batchCreate(inventoryBatchData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${inventoryBatches.length} inventory batches`)

  // 6. Create inventory stock
  console.log('📊 Creating inventory stock...')
  const inventoryStockData: Array<ReturnType<typeof generateWmsInventoryStock>> = []
  products.forEach((product) => {
    const stockLocationCount = faker.number.int({ min: 1, max: 4 })
    for (let i = 0; i < stockLocationCount; i++) {
      const location = faker.helpers.arrayElement(allLocations)
      const batchId =
        Math.random() > 0.4 ? faker.helpers.arrayElement(inventoryBatches).id : undefined
      inventoryStockData.push(generateWmsInventoryStock(faker, location.id, product.id, batchId))
    }
  })
  const inventoryStock = await inventoryStockRepo
    .batchCreate(inventoryStockData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${inventoryStock.length} inventory stock records`)

  // 7. Create sales orders
  console.log('🛒 Creating sales orders...')
  const salesOrderData = Array.from({ length: 150 }, () => {
    const clientId =
      crmCompanies.length > 0
        ? faker.helpers.arrayElement(crmCompanies).id
        : faker.helpers.arrayElement(userIds) // fallback to user if no companies
    const crmOpportunityId =
      Math.random() > 0.6 && crmOpportunities.length > 0
        ? faker.helpers.arrayElement(crmOpportunities).id
        : undefined
    return generateWmsSalesOrder(faker, clientId, crmOpportunityId)
  })
  const salesOrders = await salesOrderRepo
    .batchCreate(salesOrderData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${salesOrders.length} sales orders`)

  // 8. Create sales order items
  console.log('📝 Creating sales order items...')
  const salesOrderItemData: Array<ReturnType<typeof generateWmsSalesOrderItem>> = []
  salesOrders.forEach((salesOrder) => {
    const itemCount = faker.number.int({ min: 1, max: 5 })
    for (let i = 0; i < itemCount; i++) {
      salesOrderItemData.push(
        generateWmsSalesOrderItem(faker, salesOrder.id, faker.helpers.arrayElement(products).id),
      )
    }
  })
  const salesOrderItems = await salesOrderItemRepo
    .batchCreate(salesOrderItemData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${salesOrderItems.length} sales order items`)

  // 9. Create inbound shipments
  console.log('📥 Creating inbound shipments...')
  const inboundShipmentData = Array.from({ length: 80 }, () => {
    const warehouseId = faker.helpers.arrayElement(warehouses).id
    const clientId =
      Math.random() > 0.3 && crmCompanies.length > 0
        ? faker.helpers.arrayElement(crmCompanies).id
        : undefined
    return generateWmsInboundShipment(faker, warehouseId, clientId)
  })
  const inboundShipments = await inboundShipmentRepo
    .batchCreate(inboundShipmentData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${inboundShipments.length} inbound shipments`)

  // 10. Create inbound shipment items
  console.log('📦 Creating inbound shipment items...')
  const inboundShipmentItemData: Array<ReturnType<typeof generateWmsInboundShipmentItem>> = []
  inboundShipments.forEach((shipment) => {
    const itemCount = faker.number.int({ min: 1, max: 6 })
    for (let i = 0; i < itemCount; i++) {
      inboundShipmentItemData.push(
        generateWmsInboundShipmentItem(faker, shipment.id, faker.helpers.arrayElement(products).id),
      )
    }
  })
  const inboundShipmentItems = await inboundShipmentItemRepo
    .batchCreate(inboundShipmentItemData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${inboundShipmentItems.length} inbound shipment items`)

  // 11. Create outbound shipments
  console.log('📤 Creating outbound shipments...')
  const outboundShipmentData = salesOrders
    .slice(0, 100)
    .map((salesOrder) =>
      generateWmsOutboundShipment(faker, salesOrder.id, faker.helpers.arrayElement(warehouses).id),
    )
  const outboundShipments = await outboundShipmentRepo
    .batchCreate(outboundShipmentData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${outboundShipments.length} outbound shipments`)

  // 12. Create outbound shipment items
  console.log('📦 Creating outbound shipment items...')
  const outboundShipmentItemData: Array<ReturnType<typeof generateWmsOutboundShipmentItem>> = []
  outboundShipments.forEach((shipment) => {
    // Get sales order items for this shipment's sales order
    const relevantOrderItems = salesOrderItems.filter(
      (item) => item.salesOrderId === shipment.salesOrderId,
    )
    relevantOrderItems.forEach((orderItem) => {
      const batchId =
        Math.random() > 0.5 ? faker.helpers.arrayElement(inventoryBatches).id : undefined
      outboundShipmentItemData.push(
        generateWmsOutboundShipmentItem(
          faker,
          shipment.id,
          orderItem.productId,
          orderItem.id,
          batchId,
        ),
      )
    })
  })
  const outboundShipmentItems = await outboundShipmentItemRepo
    .batchCreate(outboundShipmentItemData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${outboundShipmentItems.length} outbound shipment items`)

  // 13. Create packages
  console.log('📮 Creating packages...')
  const packageData = salesOrders.slice(0, 80).map((salesOrder) => {
    const warehouseId = faker.helpers.arrayElement(warehouses).id
    const packedByUserId = Math.random() > 0.2 ? faker.helpers.arrayElement(userIds) : undefined
    return generateWmsPackage(faker, salesOrder.id, warehouseId, packedByUserId)
  })
  const packages = await packageRepo
    .batchCreate(packageData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${packages.length} packages`)

  // 14. Create package items
  console.log('📦 Creating package items...')
  const packageItemData: Array<ReturnType<typeof generateWmsPackageItem>> = []
  packages.forEach((pkg) => {
    const itemCount = faker.number.int({ min: 1, max: 4 })
    for (let i = 0; i < itemCount; i++) {
      const batchId =
        Math.random() > 0.5 ? faker.helpers.arrayElement(inventoryBatches).id : undefined
      packageItemData.push(
        generateWmsPackageItem(faker, pkg.id, faker.helpers.arrayElement(products).id, batchId),
      )
    }
  })
  const packageItems = await packageItemRepo
    .batchCreate(packageItemData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${packageItems.length} package items`)

  // 15. Create pick batches
  console.log('🎯 Creating pick batches...')
  const pickBatchData = Array.from({ length: 40 }, () => {
    const warehouseId = faker.helpers.arrayElement(warehouses).id
    const assignedUserId = Math.random() > 0.3 ? faker.helpers.arrayElement(userIds) : undefined
    return generateWmsPickBatch(faker, warehouseId, assignedUserId)
  })
  const pickBatches = await pickBatchRepo
    .batchCreate(pickBatchData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${pickBatches.length} pick batches`)

  // 16. Create pick batch items
  console.log('📋 Creating pick batch items...')
  const pickBatchItemData: Array<ReturnType<typeof generateWmsPickBatchItem>> = []
  pickBatches.forEach((batch) => {
    const itemCount = faker.number.int({ min: 2, max: 8 })
    for (let i = 0; i < itemCount; i++) {
      pickBatchItemData.push(
        generateWmsPickBatchItem(faker, batch.id, faker.helpers.arrayElement(salesOrders).id),
      )
    }
  })
  const pickBatchItems = await pickBatchItemRepo
    .batchCreate(pickBatchItemData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${pickBatchItems.length} pick batch items`)

  // 17. Create tasks
  console.log('📋 Creating tasks...')
  const taskData = Array.from({ length: 120 }, () => {
    const warehouseId = faker.helpers.arrayElement(warehouses).id
    const taskType = faker.helpers.arrayElement(Object.values(WmsTaskTypeEnum))
    const userId = Math.random() > 0.2 ? faker.helpers.arrayElement(userIds) : undefined
    const pickBatchId = Math.random() > 0.6 ? faker.helpers.arrayElement(pickBatches).id : undefined
    return generateWmsTask(faker, warehouseId, taskType, userId, pickBatchId)
  })
  const tasks = await taskRepo
    .batchCreate(taskData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${tasks.length} tasks`)

  // 18. Create task items
  console.log('📦 Creating task items...')
  const taskItemData: Array<ReturnType<typeof generateWmsTaskItem>> = []
  tasks.forEach((task) => {
    const itemCount = faker.number.int({ min: 1, max: 4 })
    for (let i = 0; i < itemCount; i++) {
      const sourceLocationId =
        Math.random() > 0.3 ? faker.helpers.arrayElement(allLocations).id : undefined
      const destinationLocationId =
        Math.random() > 0.3 ? faker.helpers.arrayElement(allLocations).id : undefined
      const batchId =
        Math.random() > 0.6 ? faker.helpers.arrayElement(inventoryBatches).id : undefined
      taskItemData.push(
        generateWmsTaskItem(
          faker,
          task.id,
          faker.helpers.arrayElement(products).id,
          sourceLocationId,
          destinationLocationId,
          batchId,
        ),
      )
    }
  })
  const taskItems = await taskItemRepo
    .batchCreate(taskItemData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${taskItems.length} task items`)

  // 19. Create utility entities

  // Bin thresholds
  console.log('⚖️ Creating bin thresholds...')
  const binThresholdData: Array<ReturnType<typeof generateWmsBinThreshold>> = []
  allLocations.slice(0, 60).forEach((location) => {
    const productCount = faker.number.int({ min: 1, max: 3 })
    for (let i = 0; i < productCount; i++) {
      binThresholdData.push(
        generateWmsBinThreshold(faker, location.id, faker.helpers.arrayElement(products).id),
      )
    }
  })
  const binThresholds = await binThresholdRepo
    .batchCreate(binThresholdData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${binThresholds.length} bin thresholds`)

  // Putaway rules
  console.log('📍 Creating putaway rules...')
  const putawayRuleData = Array.from({ length: 80 }, () => {
    const warehouseId = faker.helpers.arrayElement(warehouses).id
    const productId = faker.helpers.arrayElement(products).id
    const clientId =
      Math.random() > 0.5 && crmCompanies.length > 0
        ? faker.helpers.arrayElement(crmCompanies).id
        : undefined
    const preferredLocationId =
      Math.random() > 0.4 ? faker.helpers.arrayElement(allLocations).id : undefined
    return generateWmsPutawayRule(faker, warehouseId, productId, clientId, preferredLocationId)
  })
  const putawayRules = await putawayRuleRepo
    .batchCreate(putawayRuleData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${putawayRules.length} putaway rules`)

  // Reorder points
  console.log('🔄 Creating reorder points...')
  const reorderPointData = Array.from({ length: 100 }, () =>
    generateWmsReorderPoint(
      faker,
      faker.helpers.arrayElement(warehouses).id,
      faker.helpers.arrayElement(products).id,
    ),
  )
  const reorderPoints = await reorderPointRepo
    .batchCreate(reorderPointData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${reorderPoints.length} reorder points`)

  // Returns
  console.log('↩️ Creating returns...')
  const returnData = Array.from({ length: 30 }, () => {
    const clientId =
      crmCompanies.length > 0
        ? faker.helpers.arrayElement(crmCompanies).id
        : faker.helpers.arrayElement(userIds) // fallback to user if no companies
    const salesOrderId =
      Math.random() > 0.4 ? faker.helpers.arrayElement(salesOrders).id : undefined
    return generateWmsReturn(faker, clientId, salesOrderId)
  })
  const returns = await returnRepo
    .batchCreate(returnData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${returns.length} returns`)

  // Return items
  console.log('📦 Creating return items...')
  const returnItemData: Array<ReturnType<typeof generateWmsReturnItem>> = []
  returns.forEach((returnRecord) => {
    const itemCount = faker.number.int({ min: 1, max: 4 })
    for (let i = 0; i < itemCount; i++) {
      returnItemData.push(
        generateWmsReturnItem(faker, returnRecord.id, faker.helpers.arrayElement(products).id),
      )
    }
  })
  const returnItems = await returnItemRepo
    .batchCreate(returnItemData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${returnItems.length} return items`)

  // Stock transfers
  console.log('🔄 Creating stock transfers...')
  const stockTransferData = Array.from({ length: 50 }, () => {
    const sourceWarehouse = faker.helpers.arrayElement(warehouses)
    let destinationWarehouse = faker.helpers.arrayElement(warehouses)
    // Ensure different warehouses
    while (destinationWarehouse.id === sourceWarehouse.id && warehouses.length > 1) {
      destinationWarehouse = faker.helpers.arrayElement(warehouses)
    }
    return generateWmsStockTransfer(
      faker,
      sourceWarehouse.id,
      destinationWarehouse.id,
      faker.helpers.arrayElement(products).id,
    )
  })
  const stockTransfers = await stockTransferRepo
    .batchCreate(stockTransferData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${stockTransfers.length} stock transfers`)

  // Inventory adjustments
  console.log('📊 Creating inventory adjustments...')
  const inventoryAdjustmentData = Array.from({ length: 80 }, () =>
    generateWmsInventoryAdjustment(
      faker,
      faker.helpers.arrayElement(products).id,
      faker.helpers.arrayElement(userIds),
      faker.helpers.arrayElement(warehouses).id,
    ),
  )
  const inventoryAdjustments = await inventoryAdjustmentRepo
    .batchCreate(inventoryAdjustmentData)
    .onConflict((oc) => oc.doNothing())
    .execute()
  console.log(`✅ Created ${inventoryAdjustments.length} inventory adjustments`)

  console.log('🎉 WMS seed data generation completed successfully!')
  console.log('📊 Summary:')
  console.log(`  - ${warehouses.length} warehouses`)
  console.log(`  - ${suppliers.length} suppliers`)
  console.log(`  - ${products.length} products`)
  console.log(`  - ${allLocations.length} locations`)
  console.log(`  - ${inventoryBatches.length} inventory batches`)
  console.log(`  - ${inventoryStock.length} inventory stock records`)
  console.log(`  - ${salesOrders.length} sales orders`)
  console.log(`  - ${salesOrderItems.length} sales order items`)
  console.log(`  - ${inboundShipments.length} inbound shipments`)
  console.log(`  - ${inboundShipmentItems.length} inbound shipment items`)
  console.log(`  - ${outboundShipments.length} outbound shipments`)
  console.log(`  - ${outboundShipmentItems.length} outbound shipment items`)
  console.log(`  - ${packages.length} packages`)
  console.log(`  - ${packageItems.length} package items`)
  console.log(`  - ${pickBatches.length} pick batches`)
  console.log(`  - ${pickBatchItems.length} pick batch items`)
  console.log(`  - ${tasks.length} tasks`)
  console.log(`  - ${taskItems.length} task items`)
  console.log(`  - ${binThresholds.length} bin thresholds`)
  console.log(`  - ${putawayRules.length} putaway rules`)
  console.log(`  - ${reorderPoints.length} reorder points`)
  console.log(`  - ${returns.length} returns`)
  console.log(`  - ${returnItems.length} return items`)
  console.log(`  - ${stockTransfers.length} stock transfers`)
  console.log(`  - ${inventoryAdjustments.length} inventory adjustments`)
}
