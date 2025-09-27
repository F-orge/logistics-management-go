use super::sea_orm_active_enums::ServiceTypeEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub name: String,
    pub service_type: ServiceTypeEnum,
    pub is_active: Option<bool>,
    pub valid_from: Date,
    pub valid_to: Option<Date>,
    pub description: Option<String>,
    pub created_by_user_id: Option<Uuid>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
