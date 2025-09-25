use async_graphql::{ComplexObject, Context, SimpleObject};
use uuid::Uuid;

use crate::models::tags;

use super::enums::RecordType;

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject)]
#[graphql(complex)]
pub struct Model {
    pub tag_id: Uuid,
    pub record_id: Uuid,
    pub record_type: RecordType,
    pub id: Uuid,
}

#[ComplexObject]
impl Model {
    async fn tag(&self, ctx: &Context<'_>) -> async_graphql::Result<tags::Model> {
        todo!()
    }
}
