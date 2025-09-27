use super::sea_orm_active_enums::PickBatchStatusEnum;
use super::sea_orm_active_enums::PickStrategyEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub batch_number: String,
    pub warehouse_id: Uuid,
    pub status: Option<PickBatchStatusEnum>,
    pub strategy: PickStrategyEnum,
    pub priority: Option<i32>,
    pub assigned_user_id: Option<Uuid>,
    pub wave_id: Option<String>,
    pub zone_restrictions: Option<Vec<String>>,
    pub estimated_duration: Option<i32>,
    pub actual_duration: Option<i32>,
    pub total_items: Option<i32>,
    pub completed_items: Option<i32>,
    pub started_at: Option<DateTime>,
    pub completed_at: Option<DateTime>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
