use async_graphql::{ComplexObject, Context, SimpleObject};
use chrono::{DateTime, Utc};
use graphql_auth::models::user;
use uuid::Uuid;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject)]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub user_id: Uuid,
    pub message: String,
    pub is_read: Option<bool>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
    pub link: Option<String>,
}

#[ComplexObject]
impl Model {
    async fn user(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        todo!()
    }
}
