#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "ims.inbound_shipment_status", rename_all = "kebab-case")]
pub enum InboundShipmentStatusEnum {
    Pending,
    Arrived,
    Processing,
    Completed,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(
    type_name = "ims.inventory_adjustment_reason",
    rename_all = "kebab-case"
)]

pub enum InventoryAdjustmentReasonEnum {
    CycleCount,
    DamagedGoods,
    Theft,
    Expired,
    ReturnToVendor,
    ManualCorrection,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "ims.outbound_shipment_status", rename_all = "kebab-case")]
pub enum OutboundShipmentStatusEnum {
    Picking,
    Packed,
    Shipped,
    Delivered,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "ims.product_status", rename_all = "kebab-case")]
pub enum ProductStatusEnum {
    Active,
    Discontinued,
    Obsolete,
    Inactive,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "ims.return_item_condition", rename_all = "kebab-case")]
pub enum ReturnItemConditionEnum {
    Sellable,
    Damaged,
    Defective,
    Expired,
    Unsellable,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "ims.return_status", rename_all = "kebab-case")]
pub enum ReturnStatusEnum {
    Requested,
    Approved,
    Rejected,
    Received,
    Processed,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "ims.sales_order_status", rename_all = "kebab-case")]
pub enum SalesOrderStatusEnum {
    Pending,
    Processing,
    Shipped,
    Completed,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "ims.stock_transfer_status", rename_all = "kebab-case")]
pub enum StockTransferStatusEnum {
    Pending,
    InTransit,
    Received,
    Cancelled,
}

#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "wms.inventory_stock_status", rename_all = "kebab-case")]
pub enum InventoryStockStatusEnum {
    Available,
    Allocated,
    Damaged,
    Quarantine,
    Hold,
    Shipped,
    Expired,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "wms.location_type", rename_all = "kebab-case")]
pub enum LocationTypeEnum {
    ReceivingDock,
    PickBin,
    PackingStation,
    CrossDockArea,
    BulkStorage,
    ReserveStorage,
    DamagedGoods,
    StagingArea,
    QualityControl,
    ReturnsArea,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "wms.pick_batch_status", rename_all = "kebab-case")]
pub enum PickBatchStatusEnum {
    Open,
    InProgress,
    Completed,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "wms.pick_strategy", rename_all = "kebab-case")]
pub enum PickStrategyEnum {
    BatchPicking,
    ZonePicking,
    WavePicking,
    SingleOrderPicking,
    ClusterPicking,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "wms.task_item_status", rename_all = "kebab-case")]
pub enum TaskItemStatusEnum {
    Pending,
    InProgress,
    Completed,
    ShortPicked,
    Damaged,
    NotFound,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "wms.task_status", rename_all = "kebab-case")]
pub enum TaskStatusEnum {
    Pending,
    Assigned,
    InProgress,
    Completed,
    Cancelled,
    Error,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "wms.task_type", rename_all = "kebab-case")]
pub enum TaskTypeEnum {
    Putaway,
    Pick,
    Pack,
    Replenishment,
    CycleCount,
    CrossDock,
    ReturnsProcessing,
    DamageInspection,
    QualityCheck,
}
