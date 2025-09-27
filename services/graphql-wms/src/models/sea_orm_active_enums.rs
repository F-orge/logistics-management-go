#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum InventoryStockStatusEnum {
    Available,
    Allocated,
    Damaged,
    Quarantine,
    Hold,
    Shipped,
    Expired,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
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
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum PickBatchStatusEnum {
    Open,
    InProgress,
    Completed,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum PickStrategyEnum {
    BatchPicking,
    ZonePicking,
    WavePicking,
    SingleOrderPicking,
    ClusterPicking,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum TaskItemStatusEnum {
    Pending,
    InProgress,
    Completed,
    ShortPicked,
    Damaged,
    NotFound,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum TaskStatusEnum {
    Pending,
    Assigned,
    InProgress,
    Completed,
    Cancelled,
    Error,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
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
