import { BinThresholdSchema } from '../schemas/wms/bin_threshold'
import { InboundShipmentSchema } from '../schemas/wms/inbound_shipment'
import { InboundShipmentItemSchema } from '../schemas/wms/inbound_shipment_item'
import { InventoryAdjustmentSchema } from '../schemas/wms/inventory_adjustment'
import { InventoryBatchSchema } from '../schemas/wms/inventory_batch'
import { InventoryStockSchema } from '../schemas/wms/inventory_stock'
import { LocationSchema } from '../schemas/wms/location'
import { OutboundShipmentSchema } from '../schemas/wms/outbound_shipment'
import { OutboundShipmentItemSchema } from '../schemas/wms/outbound_shipment_item'
import { PackageSchema } from '../schemas/wms/package'
import { PackageItemSchema } from '../schemas/wms/package_item'
import { PickBatchSchema } from '../schemas/wms/pick_batch'
import { PickBatchItemSchema } from '../schemas/wms/pick_batch_item'
import { ProductSchema } from '../schemas/wms/product'
import { PutawayRuleSchema } from '../schemas/wms/putaway_rule'
import { ReorderPointSchema } from '../schemas/wms/reorder_point'
import { ReturnSchema } from '../schemas/wms/return'
import { ReturnItemSchema } from '../schemas/wms/return_item'
import { SalesOrderSchema } from '../schemas/wms/sales_order'
import { SalesOrderItemSchema } from '../schemas/wms/sales_order_item'
import { StockTransferSchema } from '../schemas/wms/stock_transfer'
import { SupplierSchema } from '../schemas/wms/supplier'
import { TaskSchema } from '../schemas/wms/task'
import { TaskItemSchema } from '../schemas/wms/task_item'
import { WarehouseSchema } from '../schemas/wms/warehouse'
import { repositoryFactory } from './interface'

export const BinThresholdRepository = repositoryFactory('wms.binThresholds', BinThresholdSchema)
export const InboundShipmentRepository = repositoryFactory(
  'wms.inboundShipments',
  InboundShipmentSchema,
)
export const InboundShipmentItemRepository = repositoryFactory(
  'wms.inboundShipmentItems',
  InboundShipmentItemSchema,
)
export const InventoryAdjustmentRepository = repositoryFactory(
  'wms.inventoryAdjustments',
  InventoryAdjustmentSchema,
)
export const InventoryBatchRepository = repositoryFactory(
  'wms.inventoryBatches',
  InventoryBatchSchema,
)
export const InventoryStockRepository = repositoryFactory(
  'wms.inventoryStock',
  InventoryStockSchema,
)
export const LocationRepository = repositoryFactory('wms.locations', LocationSchema)
export const OutboundShipmentRepository = repositoryFactory(
  'wms.outboundShipments',
  OutboundShipmentSchema,
)
export const OutboundShipmentItemRepository = repositoryFactory(
  'wms.outboundShipmentItems',
  OutboundShipmentItemSchema,
)
export const PackageRepository = repositoryFactory('wms.packages', PackageSchema)
export const PackageItemRepository = repositoryFactory('wms.packageItems', PackageItemSchema)
export const PickBatchRepository = repositoryFactory('wms.pickBatches', PickBatchSchema)
export const PickBatchItemRepository = repositoryFactory('wms.pickBatchItems', PickBatchItemSchema)
export const ProductRepository = repositoryFactory('wms.products', ProductSchema)
export const PutawayRuleRepository = repositoryFactory('wms.putawayRules', PutawayRuleSchema)
export const ReorderPointRepository = repositoryFactory('wms.reorderPoints', ReorderPointSchema)
export const ReturnRepository = repositoryFactory('wms.returns', ReturnSchema)
export const ReturnItemRepository = repositoryFactory('wms.returnItems', ReturnItemSchema)
export const SalesOrderRepository = repositoryFactory('wms.salesOrders', SalesOrderSchema)
export const SalesOrderItemRepository = repositoryFactory(
  'wms.salesOrderItems',
  SalesOrderItemSchema,
)
export const StockTransferRepository = repositoryFactory('wms.stockTransfers', StockTransferSchema)
export const SupplierRepository = repositoryFactory('wms.suppliers', SupplierSchema)
export const TaskRepository = repositoryFactory('wms.tasks', TaskSchema)
export const TaskItemRepository = repositoryFactory('wms.taskItems', TaskItemSchema)
export const WarehouseRepository = repositoryFactory('wms.warehouses', WarehouseSchema)
