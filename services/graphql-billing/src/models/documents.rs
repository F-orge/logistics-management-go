use super::sea_orm_active_enums::DocumentTypeEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub record_id: Uuid,
    pub record_type: String,
    pub document_type: DocumentTypeEnum,
    pub file_path: String,
    pub file_name: String,
    pub file_size: Option<i32>,
    pub mime_type: Option<String>,
    pub uploaded_by_user_id: Option<Uuid>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
