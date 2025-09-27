use super::sea_orm_active_enums::TaskItemStatusEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub task_id: Uuid,
    pub product_id: Uuid,
    pub batch_id: Option<Uuid>,
    pub source_location_id: Option<Uuid>,
    pub destination_location_id: Option<Uuid>,
    pub quantity_required: i32,
    pub quantity_completed: i32,
    pub quantity_remaining: Option<i32>,
    pub status: Option<TaskItemStatusEnum>,
    pub lot_number: Option<String>,
    pub serial_numbers: Option<Vec<String>>,
    pub expiry_date: Option<Date>,
    pub notes: Option<String>,
    pub completed_at: Option<DateTime>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
