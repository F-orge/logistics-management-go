import { Faker } from '@faker-js/faker';
import { Insertable } from 'kysely';
import {
  DB,
  WmsInboundShipmentStatusEnum,
  WmsInventoryAdjustmentReasonEnum,
  WmsInventoryStockStatusEnum,
  WmsLocationTypeEnum,
  WmsOutboundShipmentStatusEnum,
  WmsPickBatchStatusEnum,
  WmsPickStrategyEnum,
  WmsProductStatusEnum,
  WmsReturnItemConditionEnum,
  WmsReturnStatusEnum,
  WmsSalesOrderStatusEnum,
  WmsStockTransferStatusEnum,
  WmsTaskItemStatusEnum,
  WmsTaskStatusEnum,
  WmsTaskTypeEnum,
} from '@/db/types';

export const generateWmsWarehouse = (
  faker: Faker,
): Insertable<DB['wms.warehouses']> => ({
  name: faker.company.name() + ' Warehouse',
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
  postalCode: faker.location.zipCode(),
  country: faker.location.country(),
  contactPerson: faker.person.fullName(),
  contactEmail: faker.internet.email(),
  contactPhone: faker.phone.number({ style: 'international' }),
  timezone: faker.location.timeZone(),
  isActive: faker.datatype.boolean(),
});

export const generateWmsSupplier = (
  faker: Faker,
): Insertable<DB['wms.suppliers']> => ({
  name: faker.company.name() + ' Supplier',
  contactPerson: faker.person.fullName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.number({ style: 'international' }),
});

export const generateWmsProduct = (
  faker: Faker,
  clientId?: string,
  supplierId?: string,
): Insertable<DB['wms.products']> => ({
  name: faker.commerce.productName(),
  sku: faker.string.alphanumeric(10).toUpperCase(),
  description: faker.commerce.productDescription(),
  costPrice: faker.number.float({ min: 1, max: 1000 }),
  weight: faker.number.float({ min: 0.1, max: 50 }),
  length: faker.number.float({ min: 1, max: 10 }),
  width: faker.number.float({ min: 1, max: 10 }),
  height: faker.number.float({ min: 1, max: 10 }),
  barcode: faker.string.numeric(12),
  status: faker.helpers.arrayElement(Object.values(WmsProductStatusEnum)),
  clientId: clientId,
  supplierId: supplierId,
});

export const generateWmsLocation = (
  faker: Faker,
  warehouseId: string,
  parentLocationId?: string,
): Insertable<DB['wms.locations']> => ({
  name: faker.string.alphanumeric(5).toUpperCase(),
  warehouseId: warehouseId,
  type: faker.helpers.arrayElement(Object.values(WmsLocationTypeEnum)),
  barcode: faker.string.numeric(8),
  isPickable: faker.datatype.boolean(),
  isReceivable: faker.datatype.boolean(),
  isActive: faker.datatype.boolean(),
  hazmatApproved: faker.datatype.boolean(),
  temperatureControlled: faker.datatype.boolean(),
  maxWeight: faker.number.float({ min: 100, max: 5000 }),
  maxVolume: faker.number.float({ min: 10, max: 500 }),
  maxPallets: faker.number.int({ min: 1, max: 20 }),
  xCoordinate: faker.number.int({ min: 0, max: 100 }),
  yCoordinate: faker.number.int({ min: 0, max: 100 }),
  zCoordinate: faker.number.int({ min: 0, max: 10 }),
  parentLocationId: parentLocationId,
  level: parentLocationId ? faker.number.int({ min: 1, max: 5 }) : 0,
  path: parentLocationId ? faker.lorem.slug() : faker.lorem.slug(), // This would be dynamically generated in a real scenario
});

export const generateWmsBinThreshold = (
  faker: Faker,
  locationId: string,
  productId: string,
): Insertable<DB['wms.binThresholds']> => ({
  locationId: locationId,
  productId: productId,
  minQuantity: faker.number.int({ min: 5, max: 50 }),
  maxQuantity: faker.number.int({ min: 100, max: 500 }),
  alertThreshold: faker.number.int({ min: 1, max: 10 }),
  reorderQuantity: faker.number.int({ min: 20, max: 100 }),
  isActive: faker.datatype.boolean(),
});

export const generateWmsInventoryBatch = (
  faker: Faker,
  productId: string,
): Insertable<DB['wms.inventoryBatches']> => ({
  productId: productId,
  batchNumber: faker.string.alphanumeric(10).toUpperCase(),
  expirationDate: faker.date.future(),
});

export const generateWmsInventoryStock = (
  faker: Faker,
  locationId: string,
  productId: string,
  batchId?: string,
): Insertable<DB['wms.inventoryStock']> => {
  const quantity = faker.number.int({ min: 1, max: 1000 });
  const reservedQuantity = faker.number.int({
    min: 0,
    max: Math.min(quantity, 100),
  });

  return {
    locationId: locationId,
    productId: productId,
    batchId: batchId,
    quantity: quantity,
    reservedQuantity: reservedQuantity,
    status: faker.helpers.arrayElement(
      Object.values(WmsInventoryStockStatusEnum),
    ),
    lastCountedAt: faker.date.recent(),
  };
};

export const generateWmsInventoryAdjustment = (
  faker: Faker,
  productId: string,
  userId: string,
  warehouseId: string,
): Insertable<DB['wms.inventoryAdjustments']> => ({
  productId: productId,
  userId: userId,
  warehouseId: warehouseId,
  quantityChange: faker.number.int({ min: -50, max: 50 }),
  reason: faker.helpers.arrayElement(
    Object.values(WmsInventoryAdjustmentReasonEnum),
  ),
  notes: faker.lorem.sentence(),
});

export const generateWmsInboundShipment = (
  faker: Faker,
  warehouseId: string,
  clientId?: string,
): Insertable<DB['wms.inboundShipments']> => ({
  warehouseId: warehouseId,
  clientId: clientId,
  expectedArrivalDate: faker.date.future(),
  actualArrivalDate: faker.date.recent(),
  status: faker.helpers.arrayElement(
    Object.values(WmsInboundShipmentStatusEnum),
  ),
});

export const generateWmsInboundShipmentItem = (
  faker: Faker,
  inboundShipmentId: string,
  productId: string,
): Insertable<DB['wms.inboundShipmentItems']> => ({
  inboundShipmentId: inboundShipmentId,
  productId: productId,
  expectedQuantity: faker.number.int({ min: 1, max: 100 }),
  receivedQuantity: faker.number.int({ min: 1, max: 100 }),
  discrepancyNotes: faker.lorem.sentence(),
});

export const generateWmsSalesOrder = (
  faker: Faker,
  clientId: string,
  crmOpportunityId?: string,
): Insertable<DB['wms.salesOrders']> => ({
  clientId: clientId,
  orderNumber: faker.string.alphanumeric(10).toUpperCase(),
  shippingAddress: faker.location.streetAddress(true),
  status: faker.helpers.arrayElement(Object.values(WmsSalesOrderStatusEnum)),
  crmOpportunityId: crmOpportunityId,
});

export const generateWmsSalesOrderItem = (
  faker: Faker,
  salesOrderId: string,
  productId: string,
): Insertable<DB['wms.salesOrderItems']> => ({
  salesOrderId: salesOrderId,
  productId: productId,
  quantityOrdered: faker.number.int({ min: 1, max: 50 }),
});

export const generateWmsOutboundShipment = (
  faker: Faker,
  salesOrderId: string,
  warehouseId: string,
): Insertable<DB['wms.outboundShipments']> => ({
  salesOrderId: salesOrderId,
  warehouseId: warehouseId,
  carrier: faker.company.name(),
  trackingNumber: faker.string.alphanumeric(15).toUpperCase(),
  status: faker.helpers.arrayElement(
    Object.values(WmsOutboundShipmentStatusEnum),
  ),
});

export const generateWmsOutboundShipmentItem = (
  faker: Faker,
  outboundShipmentId: string,
  productId: string,
  salesOrderItemId: string,
  batchId?: string,
): Insertable<DB['wms.outboundShipmentItems']> => ({
  outboundShipmentId: outboundShipmentId,
  productId: productId,
  salesOrderItemId: salesOrderItemId,
  quantityShipped: faker.number.int({ min: 1, max: 50 }),
  batchId: batchId,
});

export const generateWmsPackage = (
  faker: Faker,
  salesOrderId: string,
  warehouseId: string,
  packedByUserId?: string,
): Insertable<DB['wms.packages']> => ({
  salesOrderId: salesOrderId,
  warehouseId: warehouseId,
  packageNumber: faker.string.alphanumeric(10).toUpperCase(),
  packageType: faker.helpers.arrayElement(['box', 'envelope', 'pallet']),
  carrier: faker.company.name(),
  serviceLevel: faker.helpers.arrayElement(['Ground', 'Express', 'Overnight']),
  trackingNumber: faker.string.alphanumeric(15).toUpperCase(),
  weight: faker.number.float({ min: 0.5, max: 100 }),
  length: faker.number.float({ min: 5, max: 150 }),
  width: faker.number.float({ min: 5, max: 150 }),
  height: faker.number.float({ min: 5, max: 150 }),
  isFragile: faker.datatype.boolean(),
  isHazmat: faker.datatype.boolean(),
  requiresSignature: faker.datatype.boolean(),
  insuranceValue: faker.number.float({ min: 10, max: 10000 }),
  packedAt: faker.date.recent(),
  shippedAt: faker.date.recent(),
  packedByUserId: packedByUserId,
});

export const generateWmsPackageItem = (
  faker: Faker,
  packageId: string,
  productId: string,
  batchId?: string,
): Insertable<DB['wms.packageItems']> => ({
  packageId: packageId,
  productId: productId,
  quantity: faker.number.int({ min: 1, max: 50 }),
  batchId: batchId,
  expiryDate: faker.date.future(),
  lotNumber: faker.string.alphanumeric(8).toUpperCase(),
  serialNumbers: faker.helpers.arrayElements(
    [faker.string.alphanumeric(12), faker.string.alphanumeric(12)],
    { min: 0, max: 3 },
  ),
  unitWeight: faker.number.float({ min: 0.1, max: 10 }),
});

export const generateWmsPickBatch = (
  faker: Faker,
  warehouseId: string,
  assignedUserId?: string,
): Insertable<DB['wms.pickBatches']> => ({
  warehouseId: warehouseId,
  batchNumber: faker.string.alphanumeric(10).toUpperCase(),
  strategy: faker.helpers.arrayElement(Object.values(WmsPickStrategyEnum)),
  status: faker.helpers.arrayElement(Object.values(WmsPickBatchStatusEnum)),
  priority: faker.number.int({ min: 1, max: 10 }),
  estimatedDuration: faker.number.int({ min: 30, max: 240 }),
  actualDuration: faker.number.int({ min: 30, max: 240 }),
  totalItems: faker.number.int({ min: 10, max: 200 }),
  completedItems: faker.number.int({ min: 0, max: 150 }),
  startedAt: faker.date.recent(),
  completedAt: faker.date.recent(),
  assignedUserId: assignedUserId,
  waveId: faker.string.uuid(),
  zoneRestrictions: faker.helpers.arrayElements(
    [faker.lorem.word(), faker.lorem.word()],
    { min: 0, max: 2 },
  ),
});

export const generateWmsPickBatchItem = (
  faker: Faker,
  pickBatchId: string,
  salesOrderId: string,
): Insertable<DB['wms.pickBatchItems']> => ({
  pickBatchId: pickBatchId,
  salesOrderId: salesOrderId,
  orderPriority: faker.number.int({ min: 1, max: 10 }),
  estimatedPickTime: faker.number.int({ min: 5, max: 60 }),
  actualPickTime: faker.number.int({ min: 5, max: 60 }),
});

export const generateWmsPutawayRule = (
  faker: Faker,
  warehouseId: string,
  productId: string,
  clientId?: string,
  preferredLocationId?: string,
): Insertable<DB['wms.putawayRules']> => ({
  warehouseId: warehouseId,
  productId: productId,
  priority: faker.number.int({ min: 1, max: 10 }),
  isActive: faker.datatype.boolean(),
  minQuantity: faker.number.int({ min: 1, max: 100 }),
  maxQuantity: faker.number.int({ min: 101, max: 1000 }),
  volumeThreshold: faker.number.float({ min: 1, max: 100 }),
  weightThreshold: faker.number.float({ min: 1, max: 500 }),
  requiresHazmatApproval: faker.datatype.boolean(),
  requiresTemperatureControl: faker.datatype.boolean(),
  locationType: faker.helpers.arrayElement(Object.values(WmsLocationTypeEnum)),
  clientId: clientId,
  preferredLocationId: preferredLocationId,
});

export const generateWmsReorderPoint = (
  faker: Faker,
  warehouseId: string,
  productId: string,
): Insertable<DB['wms.reorderPoints']> => ({
  warehouseId: warehouseId,
  productId: productId,
  threshold: faker.number.int({ min: 10, max: 100 }),
});

export const generateWmsReturn = (
  faker: Faker,
  clientId: string,
  salesOrderId?: string,
): Insertable<DB['wms.returns']> => ({
  clientId: clientId,
  returnNumber: faker.string.alphanumeric(10).toUpperCase(),
  reason: faker.lorem.sentence(),
  status: faker.helpers.arrayElement(Object.values(WmsReturnStatusEnum)),
  salesOrderId: salesOrderId,
});

export const generateWmsReturnItem = (
  faker: Faker,
  returnId: string,
  productId: string,
): Insertable<DB['wms.returnItems']> => ({
  returnId: returnId,
  productId: productId,
  quantityExpected: faker.number.int({ min: 1, max: 50 }),
  quantityReceived: faker.number.int({ min: 0, max: 50 }),
  condition: faker.helpers.arrayElement(
    Object.values(WmsReturnItemConditionEnum),
  ),
});

export const generateWmsStockTransfer = (
  faker: Faker,
  sourceWarehouseId: string,
  destinationWarehouseId: string,
  productId: string,
): Insertable<DB['wms.stockTransfers']> => ({
  sourceWarehouseId: sourceWarehouseId,
  destinationWarehouseId: destinationWarehouseId,
  productId: productId,
  quantity: faker.number.int({ min: 1, max: 100 }),
  status: faker.helpers.arrayElement(Object.values(WmsStockTransferStatusEnum)),
});

export const generateWmsTask = (
  faker: Faker,
  warehouseId: string,
  type: WmsTaskTypeEnum,
  userId?: string,
  pickBatchId?: string,
  sourceEntityId?: string,
  sourceEntityType?: string,
): Insertable<DB['wms.tasks']> => ({
  warehouseId: warehouseId,
  taskNumber: faker.string.alphanumeric(10).toUpperCase(),
  type: type,
  instructions: faker.lorem.sentence(),
  notes: faker.lorem.paragraph(),
  priority: faker.number.int({ min: 1, max: 10 }),
  estimatedDuration: faker.number.int({ min: 5, max: 120 }),
  actualDuration: faker.number.int({ min: 5, max: 120 }),
  startTime: faker.date.recent(),
  endTime: faker.date.recent(),
  status: faker.helpers.arrayElement(Object.values(WmsTaskStatusEnum)),
  userId: userId,
  pickBatchId: pickBatchId,
  sourceEntityId: sourceEntityId,
  sourceEntityType: sourceEntityType,
});

export const generateWmsTaskItem = (
  faker: Faker,
  taskId: string,
  productId: string,
  sourceLocationId?: string,
  destinationLocationId?: string,
  batchId?: string,
): Insertable<DB['wms.taskItems']> => {
  const quantityRequired = faker.number.int({ min: 1, max: 50 });
  const quantityCompleted = faker.number.int({ min: 0, max: quantityRequired });

  return {
    taskId: taskId,
    productId: productId,
    quantityRequired: quantityRequired,
    quantityCompleted: quantityCompleted,
    status: faker.helpers.arrayElement(Object.values(WmsTaskItemStatusEnum)),
    notes: faker.lorem.sentence(),
    sourceLocationId: sourceLocationId,
    destinationLocationId: destinationLocationId,
    batchId: batchId,
    expiryDate: faker.date.future(),
    lotNumber: faker.string.alphanumeric(8).toUpperCase(),
    serialNumbers: faker.helpers.arrayElements(
      [faker.string.alphanumeric(12), faker.string.alphanumeric(12)],
      { min: 0, max: 3 },
    ),
  };
};
