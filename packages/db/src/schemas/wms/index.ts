import { z } from "zod";
import { BinThresholdSchema } from "./bin_threshold";
import { InboundShipmentItemSchema } from "./inbound_shipment_item";
import { InboundShipmentSchema } from "./inbound_shipment";
import { InventoryAdjustmentSchema } from "./inventory_adjustment";
import { InventoryBatchSchema } from "./inventory_batch";
import { InventoryStockSchema } from "./inventory_stock";
import { LocationSchema } from "./location";
import { OutboundShipmentItemSchema } from "./outbound_shipment_item";
import { OutboundShipmentSchema } from "./outbound_shipment";
import { PackageItemSchema } from "./package_item";
import { PackageSchema } from "./package";
import { PickBatchItemSchema } from "./pick_batch_item";
import { PickBatchSchema } from "./pick_batch";
import { ProductSchema } from "./product";
import { PutawayRuleSchema } from "./putaway_rule";
import { ReorderPointSchema } from "./reorder_point";
import { ReturnItemSchema } from "./return_item";
import { ReturnSchema } from "./return";
import { SalesOrderItemSchema } from "./sales_order_item";
import { SalesOrderSchema } from "./sales_order";
import { StockTransferSchema } from "./stock_transfer";
import { SupplierSchema } from "./supplier";
import { TaskItemSchema } from "./task_item";
import { TaskSchema } from "./task";
import { WarehouseSchema } from "./warehouse";

export default z.object({
  binThresholds: BinThresholdSchema,
  inboundShipmentItems: InboundShipmentItemSchema,
  inboundShipments: InboundShipmentSchema,
  inventoryAdjustments: InventoryAdjustmentSchema,
  inventoryBatches: InventoryBatchSchema,
  inventoryStocks: InventoryStockSchema,
  locations: LocationSchema,
  outboundShipmentItems: OutboundShipmentItemSchema,
  outboundShipments: OutboundShipmentSchema,
  packageItems: PackageItemSchema,
  packages: PackageSchema,
  pickBatchItems: PickBatchItemSchema,
  pickBatches: PickBatchSchema,
  products: ProductSchema,
  putawayRules: PutawayRuleSchema,
  reorderPoints: ReorderPointSchema,
  returnItems: ReturnItemSchema,
  returns: ReturnSchema,
  salesOrderItems: SalesOrderItemSchema,
  salesOrders: SalesOrderSchema,
  stockTransfers: StockTransferSchema,
  suppliers: SupplierSchema,
  taskItems: TaskItemSchema,
  tasks: TaskSchema,
  warehouses: WarehouseSchema,
});
