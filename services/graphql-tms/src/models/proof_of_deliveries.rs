use super::sea_orm_active_enums::ProofTypeEnum;

#[derive(Clone, Debug, PartialEq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub trip_stop_id: Uuid,
    pub r#type: Option<ProofTypeEnum>,
    pub file_path: Option<String>,
    pub timestamp: DateTime,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
