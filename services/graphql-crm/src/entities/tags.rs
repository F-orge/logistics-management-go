use chrono::{DateTime, Utc};
use sea_query::{Alias, Iden, InsertStatement, Query, UpdateStatement};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Iden)]
#[iden(rename = "tags")]
pub enum Tags {
    Table,
    Id,
    Name,
    CreatedAt,
    UpdatedAt,
}

#[derive(Clone, Debug, FromRow)]
pub struct TagsTable {
    pub id: Uuid,
    pub name: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertTagsInput {
    #[validate(length(min = 1))]
    pub name: String,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateTagsInput {
    #[validate(length(min = 1))]
    pub name: Option<String>,
}

impl From<InsertTagsInput> for InsertStatement {
    fn from(value: InsertTagsInput) -> Self {
        Query::insert()
            .into_table((Alias::new("crm"), Tags::Table))
            .columns([Tags::Name])
            .values([value.name.into()])
            .expect("Failed to convert tags input to sea-query")
            .to_owned()
    }
}

impl From<UpdateTagsInput> for UpdateStatement {
    fn from(value: UpdateTagsInput) -> Self {
        let mut stmt = Query::update();

        let mut stmt = stmt.table((Alias::new("crm"), Tags::Table));

        if let Some(name) = value.name {
            stmt = stmt.value(Tags::Name, name);
        }

        stmt.to_owned()
    }
}
