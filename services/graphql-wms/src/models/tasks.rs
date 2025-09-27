use super::sea_orm_active_enums::TaskStatusEnum;
use super::sea_orm_active_enums::TaskTypeEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub task_number: String,
    pub warehouse_id: Uuid,
    pub user_id: Option<Uuid>,
    pub r#type: TaskTypeEnum,
    pub status: Option<TaskStatusEnum>,
    pub priority: Option<i32>,
    pub source_entity_id: Option<Uuid>,
    pub source_entity_type: Option<String>,
    pub pick_batch_id: Option<Uuid>,
    pub estimated_duration: Option<i32>,
    pub actual_duration: Option<i32>,
    pub instructions: Option<String>,
    pub notes: Option<String>,
    pub start_time: Option<DateTime>,
    pub end_time: Option<DateTime>,
    pub duration_seconds: Option<i32>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
