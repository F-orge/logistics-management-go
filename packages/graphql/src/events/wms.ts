import { Selectable } from "kysely";
import {
  WmsTaskStatusEnum,
  WmsTaskTypeEnum,
  WmsTaskItemStatusEnum,
  WmsPickBatchStatusEnum,
  WmsReturnStatusEnum,
  WmsReturnItemConditionEnum,
  WmsSalesOrderStatusEnum,
  WmsStockTransferStatusEnum,
  WmsInboundShipmentStatusEnum,
  WmsOutboundShipmentStatusEnum,
  WmsInventoryStockStatusEnum,
  DB,
} from "../db.types";

export type WmsEvents = {
  // Task Events
  "wms.task.created": Selectable<DB["wms.tasks"]>;
  "wms.task.assigned": Selectable<DB["wms.tasks"]> & {
    previousUserId: string | null;
  };
  "wms.task.started": Selectable<DB["wms.tasks"]>;
  "wms.task.completed": Selectable<DB["wms.tasks"]>;
  "wms.task.cancelled": Selectable<DB["wms.tasks"]>;
  "wms.task.statusChanged": {
    id: string;
    newStatus: WmsTaskStatusEnum;
    previousStatus: WmsTaskStatusEnum;
    type: WmsTaskTypeEnum;
  };

  // Replenishment Task Events
  "wms.task.replenishmentCreated": Selectable<DB["wms.tasks"]> & {
    binId: string;
    reason: string;
  };

  // Put-Away Task Events
  "wms.task.putawayCreated": Selectable<DB["wms.tasks"]> & {
    returnId: string;
    reason: string;
  };

  // Task Item Events
  "wms.taskItem.completed": Selectable<DB["wms.taskItems"]>;
  "wms.taskItem.statusChanged": {
    id: string;
    newStatus: WmsTaskItemStatusEnum;
    previousStatus: WmsTaskItemStatusEnum;
    taskId: string;
  };
  "wms.taskItem.shortPicked": Selectable<DB["wms.taskItems"]> & {
    shortQuantity: number;
  };
  "wms.taskItem.damaged": Selectable<DB["wms.taskItems"]>;

  // Pick Batch Events
  "wms.pickBatch.created": Selectable<DB["wms.pickBatches"]>;
  "wms.pickBatch.started": Selectable<DB["wms.pickBatches"]>;
  "wms.pickBatch.completed": Selectable<DB["wms.pickBatches"]>;
  "wms.pickBatch.statusChanged": {
    id: string;
    newStatus: WmsPickBatchStatusEnum;
    previousStatus: WmsPickBatchStatusEnum;
  };

  // Return Events
  "wms.return.received": Selectable<DB["wms.returns"]>;
  "wms.return.statusChanged": {
    id: string;
    newStatus: WmsReturnStatusEnum;
    previousStatus: WmsReturnStatusEnum;
    clientId: string;
  };
  "wms.return.approved": Selectable<DB["wms.returns"]>;
  "wms.return.rejected": Selectable<DB["wms.returns"]> & {
    rejectionReason: string | null;
  };
  "wms.return.processed": Selectable<DB["wms.returns"]>;

  // Return Item Events
  "wms.returnItem.evaluated": Selectable<DB["wms.returnItems"]> & {
    condition: WmsReturnItemConditionEnum | null;
  };

  // Sales Order Events
  "wms.salesOrder.created": Selectable<DB["wms.salesOrders"]>;
  "wms.salesOrder.statusChanged": {
    id: string;
    newStatus: WmsSalesOrderStatusEnum;
    previousStatus: WmsSalesOrderStatusEnum;
    clientId: string;
  };
  "wms.salesOrder.processing": Selectable<DB["wms.salesOrders"]>;
  "wms.salesOrder.shipped": Selectable<DB["wms.salesOrders"]>;
  "wms.salesOrder.completed": Selectable<DB["wms.salesOrders"]>;

  // Stock Transfer Events
  "wms.stockTransfer.initiated": Selectable<DB["wms.stockTransfers"]>;
  "wms.stockTransfer.statusChanged": {
    id: string;
    newStatus: WmsStockTransferStatusEnum;
    previousStatus: WmsStockTransferStatusEnum;
    productId: string;
  };
  "wms.stockTransfer.inTransit": Selectable<DB["wms.stockTransfers"]>;
  "wms.stockTransfer.received": Selectable<DB["wms.stockTransfers"]>;

  // Inbound Shipment Events (IMS)
  "ims.inboundShipment.received": Selectable<DB["wms.inboundShipments"]>;
  "ims.inboundShipment.statusChanged": {
    id: string;
    newStatus: WmsInboundShipmentStatusEnum;
    previousStatus: WmsInboundShipmentStatusEnum;
    warehouseId: string;
  };
  "ims.inboundShipment.processing": Selectable<DB["wms.inboundShipments"]>;
  "ims.inboundShipment.completed": Selectable<DB["wms.inboundShipments"]>;

  // Outbound Shipment Events (IMS)
  "ims.outboundShipment.created": Selectable<DB["wms.outboundShipments"]>;
  "ims.outboundShipment.statusChanged": {
    id: string;
    newStatus: WmsOutboundShipmentStatusEnum;
    previousStatus: WmsOutboundShipmentStatusEnum;
    salesOrderId: string;
  };
  "ims.outboundShipment.picking": Selectable<DB["wms.outboundShipments"]>;
  "ims.outboundShipment.packed": Selectable<DB["wms.outboundShipments"]>;
  "ims.outboundShipment.shipped": Selectable<DB["wms.outboundShipments"]>;
  "ims.outboundShipment.delivered": Selectable<DB["wms.outboundShipments"]>;

  // Inventory Stock Events (IMS)
  "ims.inventoryStock.statusChanged": {
    id: string;
    newStatus: WmsInventoryStockStatusEnum;
    previousStatus: WmsInventoryStockStatusEnum;
    productId: string;
    locationId: string;
    quantity: number;
  };
  "ims.inventoryStock.reserved": Selectable<DB["wms.inventoryStock"]> & {
    reservedQuantity: number;
  };
  "ims.inventoryStock.released": Selectable<DB["wms.inventoryStock"]> & {
    releasedQuantity: number;
  };
  "ims.inventoryStock.lowStockAlert": {
    id: string;
    productId: string;
    locationId: string;
    currentQuantity: number;
    reorderPoint: number;
    warehouseId: string;
  };

  // Inventory Adjustment Events (IMS)
  "ims.inventoryAdjustment.recorded": Selectable<
    DB["wms.inventoryAdjustments"]
  > & {
    previousQuantity: number;
  };
  "ims.inventoryAdjustment.damagedReturn": Selectable<
    DB["wms.inventoryAdjustments"]
  > & {
    returnId: string;
  };
};
