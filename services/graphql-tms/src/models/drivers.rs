use super::sea_orm_active_enums::DriverStatusEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub user_id: Uuid,
    pub license_number: String,
    pub license_expiry_date: Option<Date>,
    pub status: Option<DriverStatusEnum>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
