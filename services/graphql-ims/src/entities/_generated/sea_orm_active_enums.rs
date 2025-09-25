

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
    enum_name = "inbound_shipment_status_enum"
)]
pub enum InboundShipmentStatusEnum {
    #[sea_orm(string_value = "pending")]
    Pending,
    #[sea_orm(string_value = "arrived")]
    Arrived,
    #[sea_orm(string_value = "processing")]
    Processing,
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
#[sea_orm(
    rs_type = "String",
    db_type = "Enum",
    enum_name = "inventory_adjustment_reason_enum"
)]
pub enum InventoryAdjustmentReasonEnum {
    #[sea_orm(string_value = "cycle_count")]
    CycleCount,
    #[sea_orm(string_value = "damaged_goods")]
    DamagedGoods,
    #[sea_orm(string_value = "theft")]
    Theft,
    #[sea_orm(string_value = "expired")]
    Expired,
    #[sea_orm(string_value = "return_to_vendor")]
    ReturnToVendor,
    #[sea_orm(string_value = "manual_correction")]
    ManualCorrection,
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
    enum_name = "outbound_shipment_status_enum"
)]
pub enum OutboundShipmentStatusEnum {
    #[sea_orm(string_value = "picking")]
    Picking,
    #[sea_orm(string_value = "packed")]
    Packed,
    #[sea_orm(string_value = "shipped")]
    Shipped,
    #[sea_orm(string_value = "delivered")]
    Delivered,
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
#[sea_orm(
    rs_type = "String",
    db_type = "Enum",
    enum_name = "product_status_enum"
)]
pub enum ProductStatusEnum {
    #[sea_orm(string_value = "active")]
    Active,
    #[sea_orm(string_value = "discontinued")]
    Discontinued,
    #[sea_orm(string_value = "obsolete")]
    Obsolete,
    #[sea_orm(string_value = "inactive")]
    Inactive,
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
    enum_name = "return_item_condition_enum"
)]
pub enum ReturnItemConditionEnum {
    #[sea_orm(string_value = "sellable")]
    Sellable,
    #[sea_orm(string_value = "damaged")]
    Damaged,
    #[sea_orm(string_value = "defective")]
    Defective,
    #[sea_orm(string_value = "expired")]
    Expired,
    #[sea_orm(string_value = "unsellable")]
    Unsellable,
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
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "return_status_enum")]
pub enum ReturnStatusEnum {
    #[sea_orm(string_value = "requested")]
    Requested,
    #[sea_orm(string_value = "approved")]
    Approved,
    #[sea_orm(string_value = "rejected")]
    Rejected,
    #[sea_orm(string_value = "received")]
    Received,
    #[sea_orm(string_value = "processed")]
    Processed,
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
    enum_name = "sales_order_status_enum"
)]
pub enum SalesOrderStatusEnum {
    #[sea_orm(string_value = "pending")]
    Pending,
    #[sea_orm(string_value = "processing")]
    Processing,
    #[sea_orm(string_value = "shipped")]
    Shipped,
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
#[sea_orm(
    rs_type = "String",
    db_type = "Enum",
    enum_name = "stock_transfer_status_enum"
)]
pub enum StockTransferStatusEnum {
    #[sea_orm(string_value = "pending")]
    Pending,
    #[sea_orm(string_value = "in_transit")]
    InTransit,
    #[sea_orm(string_value = "received")]
    Received,
    #[sea_orm(string_value = "cancelled")]
    Cancelled,
}
