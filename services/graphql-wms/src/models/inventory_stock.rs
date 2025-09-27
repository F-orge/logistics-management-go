use super::sea_orm_active_enums::InventoryStockStatusEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub location_id: Uuid,
    pub product_id: Uuid,
    pub batch_id: Option<Uuid>,
    pub quantity: i32,
    pub reserved_quantity: i32,
    pub available_quantity: Option<i32>,
    pub status: Option<InventoryStockStatusEnum>,
    pub last_counted_at: Option<DateTime>,
    pub last_movement_at: Option<DateTime>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
