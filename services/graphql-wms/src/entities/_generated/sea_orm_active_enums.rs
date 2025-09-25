use sea_orm::entity::prelude::*;

#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(
    rs_type = "String",
    db_type = "Enum",
    enum_name = "inventory_stock_status_enum"
)]
pub enum InventoryStockStatusEnum {
    #[sea_orm(string_value = "available")]
    Available,
    #[sea_orm(string_value = "allocated")]
    Allocated,
    #[sea_orm(string_value = "damaged")]
    Damaged,
    #[sea_orm(string_value = "quarantine")]
    Quarantine,
    #[sea_orm(string_value = "hold")]
    Hold,
    #[sea_orm(string_value = "shipped")]
    Shipped,
    #[sea_orm(string_value = "expired")]
    Expired,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "location_type_enum")]
pub enum LocationTypeEnum {
    #[sea_orm(string_value = "receiving_dock")]
    ReceivingDock,
    #[sea_orm(string_value = "pick_bin")]
    PickBin,
    #[sea_orm(string_value = "packing_station")]
    PackingStation,
    #[sea_orm(string_value = "cross_dock_area")]
    CrossDockArea,
    #[sea_orm(string_value = "bulk_storage")]
    BulkStorage,
    #[sea_orm(string_value = "reserve_storage")]
    ReserveStorage,
    #[sea_orm(string_value = "damaged_goods")]
    DamagedGoods,
    #[sea_orm(string_value = "staging_area")]
    StagingArea,
    #[sea_orm(string_value = "quality_control")]
    QualityControl,
    #[sea_orm(string_value = "returns_area")]
    ReturnsArea,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(
    rs_type = "String",
    db_type = "Enum",
    enum_name = "pick_batch_status_enum"
)]
pub enum PickBatchStatusEnum {
    #[sea_orm(string_value = "open")]
    Open,
    #[sea_orm(string_value = "in_progress")]
    InProgress,
    #[sea_orm(string_value = "completed")]
    Completed,
    #[sea_orm(string_value = "cancelled")]
    Cancelled,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "pick_strategy_enum")]
pub enum PickStrategyEnum {
    #[sea_orm(string_value = "batch_picking")]
    BatchPicking,
    #[sea_orm(string_value = "zone_picking")]
    ZonePicking,
    #[sea_orm(string_value = "wave_picking")]
    WavePicking,
    #[sea_orm(string_value = "single_order_picking")]
    SingleOrderPicking,
    #[sea_orm(string_value = "cluster_picking")]
    ClusterPicking,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(
    rs_type = "String",
    db_type = "Enum",
    enum_name = "task_item_status_enum"
)]
pub enum TaskItemStatusEnum {
    #[sea_orm(string_value = "pending")]
    Pending,
    #[sea_orm(string_value = "in_progress")]
    InProgress,
    #[sea_orm(string_value = "completed")]
    Completed,
    #[sea_orm(string_value = "short_picked")]
    ShortPicked,
    #[sea_orm(string_value = "damaged")]
    Damaged,
    #[sea_orm(string_value = "not_found")]
    NotFound,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "task_status_enum")]
pub enum TaskStatusEnum {
    #[sea_orm(string_value = "pending")]
    Pending,
    #[sea_orm(string_value = "assigned")]
    Assigned,
    #[sea_orm(string_value = "in_progress")]
    InProgress,
    #[sea_orm(string_value = "completed")]
    Completed,
    #[sea_orm(string_value = "cancelled")]
    Cancelled,
    #[sea_orm(string_value = "error")]
    Error,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Copy,
    async_graphql :: Enum,
    fake :: Dummy,
)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "task_type_enum")]
pub enum TaskTypeEnum {
    #[sea_orm(string_value = "putaway")]
    Putaway,
    #[sea_orm(string_value = "pick")]
    Pick,
    #[sea_orm(string_value = "pack")]
    Pack,
    #[sea_orm(string_value = "replenishment")]
    Replenishment,
    #[sea_orm(string_value = "cycle_count")]
    CycleCount,
    #[sea_orm(string_value = "cross_dock")]
    CrossDock,
    #[sea_orm(string_value = "returns_processing")]
    ReturnsProcessing,
    #[sea_orm(string_value = "damage_inspection")]
    DamageInspection,
    #[sea_orm(string_value = "quality_check")]
    QualityCheck,
}
