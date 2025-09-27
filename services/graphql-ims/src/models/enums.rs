#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "ims.inbound_shipment_status")]
pub enum InboundShipmentStatusEnum {
    Pending,
    Arrived,
    Processing,
    Completed,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "ims.inventory_adjustment_reason")]

pub enum InventoryAdjustmentReasonEnum {
    CycleCount,
    DamagedGoods,
    Theft,
    Expired,
    ReturnToVendor,
    ManualCorrection,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "ims.outbound_shipment_status")]
pub enum OutboundShipmentStatusEnum {
    Picking,
    Packed,
    Shipped,
    Delivered,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "ims.product_status")]
pub enum ProductStatusEnum {
    Active,
    Discontinued,
    Obsolete,
    Inactive,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "ims.return_item_condition")]
pub enum ReturnItemConditionEnum {
    Sellable,
    Damaged,
    Defective,
    Expired,
    Unsellable,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "ims.return_status")]
pub enum ReturnStatusEnum {
    Requested,
    Approved,
    Rejected,
    Received,
    Processed,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "ims.sales_order_status")]
pub enum SalesOrderStatusEnum {
    Pending,
    Processing,
    Shipped,
    Completed,
    Cancelled,
}
#[derive(Debug, Clone, PartialEq, Eq, Copy, async_graphql :: Enum, fake :: Dummy, sqlx::Type)]
#[sqlx(type_name = "ims.stock_transfer_status")]
pub enum StockTransferStatusEnum {
    Pending,
    InTransit,
    Received,
    Cancelled,
}
