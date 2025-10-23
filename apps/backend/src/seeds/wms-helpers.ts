import { Faker } from "@faker-js/faker";
import type { Insertable } from "kysely";
import {
  WmsWarehouse,
  WmsLocation,
  WmsProduct,
  WmsSupplier,
  WmsInventoryStock,
  WmsInventoryBatch,
  WmsInventoryAdjustment,
  WmsBinThreshold,
  WmsReorderPoint,
  WmsInboundShipment,
  WmsInboundShipmentItem,
  WmsOutboundShipment,
  WmsOutboundShipmentItem,
  WmsSalesOrder,
  WmsSalesOrderItem,
  WmsReturn,
  WmsReturnItem,
  WmsStockTransfer,
  WmsPackage,
  WmsPackageItem,
  WmsTask,
  WmsTaskItem,
  WmsPickBatch,
  WmsPickBatchItem,
  WmsPutawayRule,
  WmsInboundShipmentStatusEnum,
  WmsOutboundShipmentStatusEnum,
  WmsSalesOrderStatusEnum,
  WmsReturnStatusEnum,
  WmsReturnItemConditionEnum,
  WmsStockTransferStatusEnum,
  WmsTaskStatusEnum,
  WmsTaskTypeEnum,
  WmsTaskItemStatusEnum,
  WmsPickBatchStatusEnum,
  WmsPickStrategyEnum,
  WmsInventoryStockStatusEnum,
  WmsInventoryAdjustmentReasonEnum,
  WmsLocationTypeEnum,
  WmsProductStatusEnum,
} from "@packages/db/db.types";

// Utility function to randomly select from enum values
const randomEnumValue = <T extends Record<string, string>>(
  enumObj: T
): T[keyof T] => {
  const values = Object.values(enumObj);
  return values[Math.floor(Math.random() * values.length)] as T[keyof T];
};

// WMS Warehouse - Base entity, no foreign keys required
export const seedWmsWarehouse = (faker: Faker): Insertable<WmsWarehouse> => ({
  name: faker.company.name() + " Warehouse",
  contactEmail: faker.internet.email(),
  contactPhone: faker.phone.number(),
  contactPerson: faker.person.fullName(),
  address: faker.location.streetAddress({ useFullAddress: true }),
  city: faker.location.city(),
  state: faker.location.state(),
  postalCode: faker.location.zipCode(),
  country: faker.location.country(),
  timezone: faker.location.timeZone(),
  isActive: faker.datatype.boolean({ probability: 0.9 }),
});

// WMS Location - Requires warehouseId
export const seedWmsLocation = (
  faker: Faker,
  options: { warehouseId: string; parentLocationId?: string }
): Insertable<WmsLocation> => ({
  warehouseId: options.warehouseId,
  parentLocationId: options.parentLocationId,
  name: faker.string.alphanumeric(8).toUpperCase(),
  type: randomEnumValue(WmsLocationTypeEnum),
  barcode: faker.helpers.maybe(() => faker.string.numeric(12), {
    probability: 0.7,
  }),
  level: faker.number.int({ min: 0, max: 3 }),
  path: faker.helpers.maybe(() => faker.system.directoryPath(), {
    probability: 0.8,
  }),
  isActive: faker.datatype.boolean({ probability: 0.9 }),
  isPickable: faker.datatype.boolean({ probability: 0.8 }),
  isReceivable: faker.datatype.boolean({ probability: 0.8 }),
  maxWeight: faker.helpers.maybe(
    () => faker.number.float({ min: 100, max: 5000, fractionDigits: 2 }),
    { probability: 0.7 }
  ),
  maxVolume: faker.helpers.maybe(
    () => faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
    { probability: 0.7 }
  ),
  maxPallets: faker.helpers.maybe(() => faker.number.int({ min: 1, max: 50 }), {
    probability: 0.6,
  }),
  temperatureControlled: faker.datatype.boolean({ probability: 0.3 }),
  hazmatApproved: faker.datatype.boolean({ probability: 0.2 }),
  xCoordinate: faker.helpers.maybe(
    () => faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }),
    { probability: 0.8 }
  ),
  yCoordinate: faker.helpers.maybe(
    () => faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }),
    { probability: 0.8 }
  ),
  zCoordinate: faker.helpers.maybe(
    () => faker.number.float({ min: 0, max: 20, fractionDigits: 2 }),
    { probability: 0.5 }
  ),
});

// WMS Product - No foreign keys required
export const seedWmsProduct = (
  faker: Faker,
  options: { clientId?: string; supplierId?: string }
): Insertable<WmsProduct> => {
  const weight = faker.number.float({ min: 0.1, max: 100, fractionDigits: 3 });
  const length = faker.number.float({ min: 1, max: 200, fractionDigits: 2 });
  const width = faker.number.float({ min: 1, max: 200, fractionDigits: 2 });
  const height = faker.number.float({ min: 1, max: 200, fractionDigits: 2 });
  const volume = width * height * length;

  return {
    name: faker.commerce.productName(),
    sku: faker.string.alphanumeric(10).toUpperCase(),
    description: faker.commerce.productDescription(),
    barcode: faker.helpers.maybe(() => faker.string.numeric(13), {
      probability: 0.8,
    }),
    weight,
    length,
    width,
    height,
    status: randomEnumValue(WmsProductStatusEnum),
    clientId: options.clientId,
    costPrice: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    supplierId: options.supplierId,
    volume,
  };
};

// WMS Supplier - No foreign keys required
export const seedWmsSupplier = (faker: Faker): Insertable<WmsSupplier> => ({
  name: faker.company.name(),
  contactPerson: faker.person.fullName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.number({ style: "international" }),
});

// WMS Inventory Stock - Requires productId and locationId
export const seedWmsInventoryStock = (
  faker: Faker,
  options: { productId: string; locationId: string; batchId?: string }
): Insertable<WmsInventoryStock> => {
  return {
    productId: options.productId,
    locationId: options.locationId,
    batchId: options.batchId,
    quantity: faker.number.int({ min: 0, max: 1000 }),
    reservedQuantity: faker.number.int({ min: 0, max: 100 }),
    status: randomEnumValue(WmsInventoryStockStatusEnum),
    lastCountedAt: faker.helpers.maybe(() => faker.date.recent({ days: 30 }), {
      probability: 0.7,
    }),
    availableQuantity: faker.number.int({ min: 0, max: 900 }),
    lastMovementAt: faker.helpers.maybe(() => faker.date.recent({ days: 15 }), {
      probability: 0.6,
    }),
  };
};

// WMS Inventory Batch - Requires productId
export const seedWmsInventoryBatch = (
  faker: Faker,
  options: { productId: string }
): Insertable<WmsInventoryBatch> => ({
  productId: options.productId,
  batchNumber: faker.string.alphanumeric(10).toUpperCase(),
  expirationDate: faker.helpers.maybe(() => faker.date.future({ years: 2 }), {
    probability: 0.6,
  }),
});

// WMS Inventory Adjustment - Requires productId, locationId, and userId
export const seedWmsInventoryAdjustment = (
  faker: Faker,
  options: {
    productId: string;
    userId: string;
    warehouseId?: string;
  }
): Insertable<WmsInventoryAdjustment> => ({
  productId: options.productId,
  userId: options.userId,
  quantityChange: faker.number.int({ min: -100, max: 100 }),
  reason: randomEnumValue(WmsInventoryAdjustmentReasonEnum),
  notes: faker.helpers.maybe(() => faker.lorem.sentence(), {
    probability: 0.7,
  }),
  warehouseId: options.warehouseId,
});

// WMS Bin Threshold - Requires productId and locationId
export const seedWmsBinThreshold = (
  faker: Faker,
  options: { productId: string; locationId: string }
): Insertable<WmsBinThreshold> => ({
  productId: options.productId,
  locationId: options.locationId,
  minQuantity: faker.number.int({ min: 1, max: 50 }),
  maxQuantity: faker.number.int({ min: 51, max: 500 }),
  reorderQuantity: faker.helpers.maybe(
    () => faker.number.int({ min: 20, max: 200 }),
    { probability: 0.8 }
  ),
  alertThreshold: faker.helpers.maybe(
    () => faker.number.int({ min: 5, max: 25 }),
    { probability: 0.7 }
  ),
  isActive: faker.datatype.boolean({ probability: 0.9 }),
});

// WMS Reorder Point - Requires productId and warehouseId
export const seedWmsReorderPoint = (
  faker: Faker,
  options: { productId: string; warehouseId: string }
): Insertable<WmsReorderPoint> => ({
  productId: options.productId,
  warehouseId: options.warehouseId,
  threshold: faker.number.int({ min: 10, max: 200 }),
});

// WMS Inbound Shipment - Requires warehouseId
export const seedWmsInboundShipment = (
  faker: Faker,
  options: { warehouseId: string; clientId?: string }
): Insertable<WmsInboundShipment> => ({
  warehouseId: options.warehouseId,
  clientId: options.clientId,
  expectedArrivalDate: faker.helpers.maybe(
    () => faker.date.recent({ days: 30 }),
    { probability: 0.9 }
  ),
  actualArrivalDate: faker.helpers.maybe(
    () => faker.date.recent({ days: 10 }),
    { probability: 0.6 }
  ),
  status: randomEnumValue(WmsInboundShipmentStatusEnum),
});

// WMS Inbound Shipment Item - Requires inboundShipmentId and productId
export const seedWmsInboundShipmentItem = (
  faker: Faker,
  options: { inboundShipmentId: string; productId: string }
): Insertable<WmsInboundShipmentItem> => ({
  inboundShipmentId: options.inboundShipmentId,
  productId: options.productId,
  expectedQuantity: faker.number.int({ min: 1, max: 100 }),
  receivedQuantity: faker.helpers.maybe(
    () => faker.number.int({ min: 0, max: 100 }),
    { probability: 0.7 }
  ),
  discrepancyNotes: faker.helpers.maybe(() => faker.lorem.sentence(), {
    probability: 0.4,
  }),
  discrepancyQuantity: faker.helpers.maybe(
    () => faker.number.int({ min: -10, max: 10 }),
    {
      probability: 0.4,
    }
  ),
});

// WMS Outbound Shipment - Requires warehouseId
export const seedWmsOutboundShipment = (
  faker: Faker,
  options: { warehouseId: string; clientId?: string; salesOrderId?: string }
): Insertable<WmsOutboundShipment> => ({
  warehouseId: options.warehouseId,
  status: randomEnumValue(WmsOutboundShipmentStatusEnum),
  carrier: faker.company.name(),
  salesOrderId: options.salesOrderId,
  trackingNumber: faker.string.alphanumeric(15).toUpperCase(),
});

// WMS Outbound Shipment Item - Requires outboundShipmentId and productId
export const seedWmsOutboundShipmentItem = (
  faker: Faker,
  options: {
    outboundShipmentId: string;
    productId: string;
    batchId?: string;
    salesOrderItemId?: string;
  }
): Insertable<WmsOutboundShipmentItem> => ({
  outboundShipmentId: options.outboundShipmentId,
  productId: options.productId,
  batchId: options.batchId,
  quantityShipped: faker.number.int({ min: 1, max: 100 }),
  salesOrderItemId: options.salesOrderItemId,
});

// WMS Sales Order - Optional clientId
export const seedWmsSalesOrder = (
  faker: Faker,
  options: { clientId?: string; crmOpportunityId?: string } = {}
): Insertable<WmsSalesOrder> => ({
  orderNumber: faker.string.alphanumeric(10).toUpperCase(),
  clientId: options.clientId,
  status: randomEnumValue(WmsSalesOrderStatusEnum),
  crmOpportunityId: options.crmOpportunityId,
  shippingAddress: faker.location.streetAddress({ useFullAddress: true }),
});

// WMS Sales Order Item - Requires salesOrderId and productId
export const seedWmsSalesOrderItem = (
  faker: Faker,
  options: { salesOrderId: string; productId: string }
): Insertable<WmsSalesOrderItem> => ({
  salesOrderId: options.salesOrderId,
  productId: options.productId,
  quantityOrdered: faker.number.int({ min: 1, max: 100 }),
});

// WMS Task - Requires warehouseId and assignedUserId
export const seedWmsTask = (
  faker: Faker,
  options: {
    warehouseId: string;
    assignedUserId: string;
    locationId?: string;
    pickBatchId?: string;
    sourceEntityId?: string;
    sourceEntityType?: string;
  }
): Insertable<WmsTask> => ({
  warehouseId: options.warehouseId,
  type: randomEnumValue(WmsTaskTypeEnum),
  priority: faker.number.int({ min: 1, max: 10 }),
  status: randomEnumValue(WmsTaskStatusEnum),
  instructions: faker.helpers.maybe(() => faker.lorem.sentence(), {
    probability: 0.7,
  }),
  actualDuration: faker.helpers.maybe(
    () => faker.number.int({ min: 5, max: 240 }),
    { probability: 0.5 }
  ),
  durationSeconds: faker.helpers.maybe(
    () => faker.number.int({ min: 300, max: 14400 }),
    { probability: 0.6 }
  ),
  endTime: faker.helpers.maybe(() => faker.date.recent({ days: 7 }), {
    probability: 0.5,
  }),
  estimatedDuration: faker.helpers.maybe(
    () => faker.number.int({ min: 5, max: 240 }),
    { probability: 0.6 }
  ),
  pickBatchId: options.pickBatchId,
  notes: faker.helpers.maybe(() => faker.lorem.sentence(), {
    probability: 0.4,
  }),
  startTime: faker.helpers.maybe(() => faker.date.recent({ days: 10 }), {
    probability: 0.6,
  }),
  sourceEntityId: options.sourceEntityId,
  sourceEntityType: options.sourceEntityType,
  taskNumber: faker.string.alphanumeric(12).toUpperCase(),
  userId: options.assignedUserId,
});

// WMS Task Item - Requires taskId and productId
export const seedWmsTaskItem = (
  faker: Faker,
  options: {
    taskId: string;
    productId: string;
    fromLocationId?: string;
    toLocationId?: string;
    batchId?: string;
  }
): Insertable<WmsTaskItem> => {
  const quantityRequired = faker.number.int({ min: 1, max: 100 });
  const quantityCompleted = faker.helpers.maybe(
    () => faker.number.int({ min: 0, max: quantityRequired }),
    { probability: 0.6 }
  );
  const quantityRemaining = quantityRequired - (quantityCompleted || 0);

  return {
    taskId: options.taskId,
    productId: options.productId,
    batchId: options.batchId,
    status: randomEnumValue(WmsTaskItemStatusEnum),
    notes: faker.helpers.maybe(() => faker.lorem.sentence(), {
      probability: 0.5,
    }),
    completedAt: faker.helpers.maybe(() => faker.date.recent({ days: 5 }), {
      probability: 0.4,
    }),
    destinationLocationId: options.toLocationId,
    lotNumber: faker.helpers.maybe(
      () => faker.string.alphanumeric(8).toUpperCase(),
      {
        probability: 0.5,
      }
    ),
    sourceLocationId: options.fromLocationId,
    quantityRequired,
    quantityCompleted,
    quantityRemaining,
    serialNumbers: faker.helpers.maybe(
      () =>
        Array.from({ length: quantityCompleted || 0 }, () =>
          faker.string.alphanumeric(10).toUpperCase()
        ),
      { probability: 0.5 }
    ),
    expiryDate: faker.helpers.maybe(() => faker.date.future({ years: 2 }), {
      probability: 0.4,
    }),
  };
};

// WMS Return - Requires clientId
export const seedWmsReturn = (
  faker: Faker,
  options: { clientId: string; salesOrderId?: string }
): Insertable<WmsReturn> => ({
  clientId: options.clientId,
  salesOrderId: options.salesOrderId,
  returnNumber: `RET-${faker.string.alphanumeric(8).toUpperCase()}`,
  reason: faker.helpers.maybe(() => faker.lorem.sentence(), {
    probability: 0.8,
  }),
  status: randomEnumValue(WmsReturnStatusEnum),
});

// WMS Return Item - Requires returnId and productId
export const seedWmsReturnItem = (
  faker: Faker,
  options: { returnId: string; productId: string }
): Insertable<WmsReturnItem> => {
  const quantityExpected = faker.number.int({ min: 1, max: 50 });
  const quantityReceived = faker.helpers.maybe(
    () => faker.number.int({ min: 0, max: quantityExpected + 2 }),
    { probability: 0.7 }
  );

  return {
    returnId: options.returnId,
    productId: options.productId,
    quantityExpected,
    quantityReceived,
    condition: faker.helpers.maybe(
      () => randomEnumValue(WmsReturnItemConditionEnum),
      { probability: 0.8 }
    ),
  };
};

// WMS Stock Transfer - Requires productId, sourceWarehouseId, and destinationWarehouseId
export const seedWmsStockTransfer = (
  faker: Faker,
  options: {
    productId: string;
    sourceWarehouseId: string;
    destinationWarehouseId: string;
  }
): Insertable<WmsStockTransfer> => ({
  productId: options.productId,
  sourceWarehouseId: options.sourceWarehouseId,
  destinationWarehouseId: options.destinationWarehouseId,
  quantity: faker.number.int({ min: 1, max: 500 }),
  status: randomEnumValue(WmsStockTransferStatusEnum),
});

// WMS Package - Requires salesOrderId and warehouseId
export const seedWmsPackage = (
  faker: Faker,
  options: {
    salesOrderId: string;
    warehouseId: string;
    packedByUserId?: string;
  }
): Insertable<WmsPackage> => ({
  salesOrderId: options.salesOrderId,
  warehouseId: options.warehouseId,
  packageNumber: `PKG-${faker.string.alphanumeric(10).toUpperCase()}`,
  packageType: faker.helpers.arrayElement([
    "box",
    "envelope",
    "pallet",
    "tube",
    "bag",
  ]),
  carrier: faker.helpers.maybe(
    () =>
      faker.helpers.arrayElement([
        "FedEx",
        "UPS",
        "DHL",
        "USPS",
        "Amazon Logistics",
      ]),
    { probability: 0.8 }
  ),
  serviceLevel: faker.helpers.maybe(
    () =>
      faker.helpers.arrayElement([
        "Ground",
        "Express",
        "Overnight",
        "Standard",
        "2-Day",
      ]),
    { probability: 0.8 }
  ),
  trackingNumber: faker.helpers.maybe(
    () => faker.string.alphanumeric(12).toUpperCase(),
    { probability: 0.7 }
  ),
  length: faker.helpers.maybe(
    () => faker.number.float({ min: 5, max: 100, fractionDigits: 1 }),
    { probability: 0.8 }
  ),
  width: faker.helpers.maybe(
    () => faker.number.float({ min: 5, max: 100, fractionDigits: 1 }),
    { probability: 0.8 }
  ),
  height: faker.helpers.maybe(
    () => faker.number.float({ min: 2, max: 50, fractionDigits: 1 }),
    { probability: 0.8 }
  ),
  weight: faker.helpers.maybe(
    () => faker.number.float({ min: 0.1, max: 50, fractionDigits: 2 }),
    { probability: 0.8 }
  ),
  isFragile: faker.datatype.boolean({ probability: 0.2 }),
  isHazmat: faker.datatype.boolean({ probability: 0.05 }),
  requiresSignature: faker.datatype.boolean({ probability: 0.3 }),
  insuranceValue: faker.helpers.maybe(
    () => faker.number.int({ min: 50, max: 5000 }).toString(),
    { probability: 0.4 }
  ),
  packedAt: faker.helpers.maybe(() => faker.date.recent({ days: 7 }), {
    probability: 0.8,
  }),
  packedByUserId: options.packedByUserId,
  shippedAt: faker.helpers.maybe(() => faker.date.recent({ days: 5 }), {
    probability: 0.6,
  }),
});

// WMS Package Item - Requires packageId and productId
export const seedWmsPackageItem = (
  faker: Faker,
  options: { packageId: string; productId: string; batchId?: string }
): Insertable<WmsPackageItem> => {
  const quantity = faker.number.int({ min: 1, max: 20 });
  const unitWeight = faker.helpers.maybe(
    () => faker.number.float({ min: 0.01, max: 10, fractionDigits: 3 }),
    { probability: 0.7 }
  );

  return {
    packageId: options.packageId,
    productId: options.productId,
    batchId: options.batchId,
    quantity,
    unitWeight,
    lotNumber: faker.helpers.maybe(
      () => faker.string.alphanumeric(8).toUpperCase(),
      { probability: 0.5 }
    ),
    serialNumbers: faker.helpers.maybe(
      () =>
        Array.from({ length: quantity }, () =>
          faker.string.alphanumeric(10).toUpperCase()
        ),
      { probability: 0.3 }
    ),
    expiryDate: faker.helpers.maybe(() => faker.date.future({ years: 2 }), {
      probability: 0.4,
    }),
  };
};

// WMS Pick Batch - Requires warehouseId
export const seedWmsPickBatch = (
  faker: Faker,
  options: { warehouseId: string; assignedUserId?: string; waveId?: string }
): Insertable<WmsPickBatch> => ({
  warehouseId: options.warehouseId,
  assignedUserId: options.assignedUserId,
  waveId: options.waveId,
  batchNumber: `BATCH-${faker.string.alphanumeric(8).toUpperCase()}`,
  strategy: randomEnumValue(WmsPickStrategyEnum),
  status: randomEnumValue(WmsPickBatchStatusEnum),
  priority: faker.helpers.maybe(() => faker.number.int({ min: 1, max: 10 }), {
    probability: 0.7,
  }),
  estimatedDuration: faker.helpers.maybe(
    () => faker.number.int({ min: 15, max: 480 }),
    { probability: 0.8 }
  ),
  actualDuration: faker.helpers.maybe(
    () => faker.number.int({ min: 10, max: 500 }),
    { probability: 0.4 }
  ),
  startedAt: faker.helpers.maybe(() => faker.date.recent({ days: 2 }), {
    probability: 0.6,
  }),
  completedAt: faker.helpers.maybe(() => faker.date.recent({ days: 1 }), {
    probability: 0.3,
  }),
  zoneRestrictions: faker.helpers.maybe(
    () =>
      faker.helpers.arrayElements(["A", "B", "C", "D", "E"], {
        min: 1,
        max: 3,
      }),
    { probability: 0.3 }
  ),
});

// WMS Pick Batch Item - Requires pickBatchId and salesOrderId
export const seedWmsPickBatchItem = (
  faker: Faker,
  options: { pickBatchId: string; salesOrderId: string }
): Insertable<WmsPickBatchItem> => ({
  pickBatchId: options.pickBatchId,
  salesOrderId: options.salesOrderId,
  orderPriority: faker.helpers.maybe(
    () => faker.number.int({ min: 1, max: 5 }),
    { probability: 0.6 }
  ),
  estimatedPickTime: faker.helpers.maybe(
    () => faker.number.int({ min: 5, max: 120 }),
    { probability: 0.8 }
  ),
  actualPickTime: faker.helpers.maybe(
    () => faker.number.int({ min: 3, max: 150 }),
    { probability: 0.4 }
  ),
});

// WMS Putaway Rule - Requires productId and warehouseId
export const seedWmsPutawayRule = (
  faker: Faker,
  options: {
    productId: string;
    warehouseId: string;
    clientId?: string;
    preferredLocationId?: string;
  }
): Insertable<WmsPutawayRule> => ({
  productId: options.productId,
  warehouseId: options.warehouseId,
  clientId: options.clientId,
  preferredLocationId: options.preferredLocationId,
  priority: faker.number.int({ min: 1, max: 100 }),
  locationType: faker.helpers.maybe(
    () => randomEnumValue(WmsLocationTypeEnum),
    { probability: 0.7 }
  ),
  minQuantity: faker.helpers.maybe(
    () => faker.number.int({ min: 1, max: 50 }),
    { probability: 0.6 }
  ),
  maxQuantity: faker.helpers.maybe(
    () => faker.number.int({ min: 51, max: 1000 }),
    { probability: 0.6 }
  ),
  weightThreshold: faker.helpers.maybe(
    () => faker.number.float({ min: 0.1, max: 100, fractionDigits: 2 }),
    { probability: 0.5 }
  ),
  volumeThreshold: faker.helpers.maybe(
    () => faker.number.float({ min: 0.01, max: 10, fractionDigits: 3 }),
    { probability: 0.5 }
  ),
  requiresTemperatureControl: faker.datatype.boolean({ probability: 0.15 }),
  requiresHazmatApproval: faker.datatype.boolean({ probability: 0.05 }),
  isActive: faker.datatype.boolean({ probability: 0.9 }),
});
