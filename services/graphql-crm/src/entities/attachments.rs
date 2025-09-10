use chrono::{DateTime, Utc};
use sea_query::{Alias, Iden, InsertStatement, Query, UpdateStatement};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Iden)]
#[iden(rename = "attachments")]
pub enum Attachments {
    Table,
    Id,
    FileName,
    FilePath,
    MimeType,
    RecordId,
    RecordType,
    CreatedAt,
    UpdatedAt,
}

#[derive(Clone, Debug, FromRow)]
pub struct AttachmentsTable {
    pub id: Uuid,
    pub file_name: String,
    pub file_path: String,
    pub mime_type: Option<String>,
    pub record_id: Option<Uuid>,
    pub record_type: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertAttachmentsInput {
    #[validate(length(min = 1))]
    pub file_name: String,
    #[validate(length(min = 1))]
    pub file_path: String,
    pub mime_type: Option<String>,
    pub record_id: Option<Uuid>,
    pub record_type: Option<String>,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateAttachmentsInput {
    pub file_name: Option<String>,
    pub file_path: Option<String>,
    pub mime_type: Option<Option<String>>,
    pub record_id: Option<Option<Uuid>>,
    pub record_type: Option<Option<String>>,
}

impl From<InsertAttachmentsInput> for InsertStatement {
    fn from(value: InsertAttachmentsInput) -> Self {
        Query::insert()
            .into_table((Alias::new("crm"), Attachments::Table))
            .columns([
                Attachments::FileName,
                Attachments::FilePath,
                Attachments::MimeType,
                Attachments::RecordId,
                Attachments::RecordType,
            ])
            .values([
                value.file_name.into(),
                value.file_path.into(),
                value.mime_type.into(),
                value.record_id.into(),
                value.record_type.into(),
            ])
            .expect("Failed to convert attachments input to sea-query")
            .to_owned()
    }
}

impl From<UpdateAttachmentsInput> for UpdateStatement {
    fn from(value: UpdateAttachmentsInput) -> Self {
        let mut stmt = Query::update();

        let mut stmt = stmt.table((Alias::new("crm"), Attachments::Table));

        if let Some(file_name) = value.file_name {
            stmt = stmt.value(Attachments::FileName, file_name);
        }
        if let Some(file_path) = value.file_path {
            stmt = stmt.value(Attachments::FilePath, file_path);
        }
        if let Some(mime_type) = value.mime_type.flatten() {
            stmt = stmt.value(Attachments::MimeType, mime_type);
        }
        if let Some(record_id) = value.record_id.flatten() {
            stmt = stmt.value(Attachments::RecordId, record_id);
        }
        if let Some(record_type) = value.record_type.flatten() {
            stmt = stmt.value(Attachments::RecordType, record_type);
        }

        stmt.to_owned()
    }
}
