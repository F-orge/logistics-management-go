use chrono::{DateTime, Utc};
use sea_query::{Alias, Iden, InsertStatement, Query, UpdateStatement};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Iden)]
#[iden(rename = "notifications")]
pub enum Notifications {
    Table,
    Id,
    UserId,
    Message,
    IsRead,
    CreatedAt,
    UpdatedAt,
    Link,
}

#[derive(Clone, Debug, FromRow)]
pub struct NotificationsTable {
    pub id: Uuid,
    pub user_id: Uuid,
    pub message: String,
    pub is_read: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub link: Option<String>,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertNotificationsInput {
    pub user_id: Uuid,
    #[validate(length(min = 1))]
    pub message: String,
    pub is_read: Option<bool>,
    pub link: Option<String>,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateNotificationsInput {
    pub user_id: Option<Uuid>,
    pub message: Option<String>,
    pub is_read: Option<bool>,
    pub link: Option<Option<String>>,
}

impl From<InsertNotificationsInput> for InsertStatement {
    fn from(value: InsertNotificationsInput) -> Self {
        Query::insert()
            .into_table((Alias::new("crm"), Notifications::Table))
            .columns([
                Notifications::UserId,
                Notifications::Message,
                Notifications::IsRead,
                Notifications::Link,
            ])
            .values([
                value.user_id.into(),
                value.message.into(),
                value.is_read.into(),
                value.link.into(),
            ])
            .expect("Failed to convert notifications input to sea-query")
            .to_owned()
    }
}

impl From<UpdateNotificationsInput> for UpdateStatement {
    fn from(value: UpdateNotificationsInput) -> Self {
        let mut stmt = Query::update();

        let mut stmt = stmt.table((Alias::new("crm"), Notifications::Table));

        if let Some(user_id) = value.user_id {
            stmt = stmt.value(Notifications::UserId, user_id);
        }
        if let Some(message) = value.message {
            stmt = stmt.value(Notifications::Message, message);
        }
        if let Some(is_read) = value.is_read {
            stmt = stmt.value(Notifications::IsRead, is_read);
        }
        if let Some(link) = value.link.flatten() {
            stmt = stmt.value(Notifications::Link, link);
        }

        stmt.to_owned()
    }
}
