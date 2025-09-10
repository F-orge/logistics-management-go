use sea_query::{Alias, Iden, InsertStatement, Query, UpdateStatement};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Iden)]
#[iden(rename = "taggings")]
pub enum Taggings {
    Table,
    TagId,
    RecordId,
    RecordType,
}

#[derive(Clone, Debug, FromRow)]
pub struct TaggingsTable {
    pub tag_id: Uuid,
    pub record_id: Uuid,
    pub record_type: String,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertTaggingsInput {
    pub tag_id: Uuid,
    pub record_id: Uuid,
    pub record_type: String,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateTaggingsInput {}

impl From<InsertTaggingsInput> for InsertStatement {
    fn from(value: InsertTaggingsInput) -> Self {
        Query::insert()
            .into_table((Alias::new("crm"), Taggings::Table))
            .columns([
                Taggings::TagId,
                Taggings::RecordId,
                Taggings::RecordType,
            ])
            .values([
                value.tag_id.into(),
                value.record_id.into(),
                value.record_type.into(),
            ])
            .expect("Failed to convert taggings input to sea-query")
            .to_owned()
    }
}

impl From<UpdateTaggingsInput> for UpdateStatement {
    fn from(_value: UpdateTaggingsInput) -> UpdateStatement {
        // taggings is a pure join table; updates are uncommon. Return an empty update.
        Query::update().to_owned()
    }
}
