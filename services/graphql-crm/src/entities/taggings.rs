use sea_query::{Alias, Iden, InsertStatement, Query};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Clone, Debug, sqlx::Type, Iden, Deserialize, Serialize)]
#[sqlx(type_name = "crm.record_type", rename_all = "kebab-case")]
pub enum RecordType {
    Companies,
    Contacts,
    Leads,
    Opportunities,
    Cases,
    Interactions,
    Campaigns,
    Products,
    Invoices,
}

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
    pub record_type: RecordType,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertTaggingsInput {
    pub tag_id: Uuid,
    pub record_id: Uuid,
    pub record_type: RecordType,
}

impl From<InsertTaggingsInput> for InsertStatement {
    fn from(value: InsertTaggingsInput) -> Self {
        Query::insert()
            .into_table((Alias::new("crm"), Taggings::Table))
            .columns([Taggings::TagId, Taggings::RecordId, Taggings::RecordType])
            .values([
                value.tag_id.into(),
                value.record_id.into(),
                value.record_type.to_string().into(),
            ])
            .expect("Failed to convert taggings input to sea-query")
            .to_owned()
    }
}
