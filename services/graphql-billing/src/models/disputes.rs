use super::sea_orm_active_enums::DisputeStatusEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub line_item_id: Uuid,
    pub client_id: Uuid,
    pub reason: String,
    pub status: Option<DisputeStatusEnum>,
    pub disputed_amount: Option<Decimal>,
    pub resolution_notes: Option<String>,
    pub submitted_at: Option<DateTime>,
    pub resolved_at: Option<DateTime>,
    pub resolved_by_user_id: Option<Uuid>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
