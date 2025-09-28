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
