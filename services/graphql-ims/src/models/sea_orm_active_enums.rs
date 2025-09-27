#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum InboundShipmentStatusEnum {
    Pending,
    Arrived,
    Processing,
    Completed,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum InventoryAdjustmentReasonEnum {
    CycleCount,
    DamagedGoods,
    Theft,
    Expired,
    ReturnToVendor,
    ManualCorrection,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum OutboundShipmentStatusEnum {
    Picking,
    Packed,
    Shipped,
    Delivered,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum ProductStatusEnum {
    Active,
    Discontinued,
    Obsolete,
    Inactive,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum ReturnItemConditionEnum {
    Sellable,
    Damaged,
    Defective,
    Expired,
    Unsellable,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum ReturnStatusEnum {
    Requested,
    Approved,
    Rejected,
    Received,
    Processed,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum SalesOrderStatusEnum {
    Pending,
    Processing,
    Shipped,
    Completed,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy)]
pub enum StockTransferStatusEnum {
    Pending,
    InTransit,
    Received,
    Cancelled,
}
