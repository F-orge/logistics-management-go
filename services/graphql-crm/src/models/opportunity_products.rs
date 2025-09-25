use async_graphql::{ComplexObject, Context, SimpleObject};
use uuid::Uuid;

use crate::models::{opportunities, products};

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject)]
#[graphql(complex)]
pub struct Model {
    #[graphql(skip)]
    pub opportunity_id: Uuid,
    #[graphql(skip)]
    pub product_id: Uuid,
    pub quantity: i32,
    pub id: Uuid,
}

#[ComplexObject]
impl Model {
    async fn opportunity(&self, ctx: &Context<'_>) -> async_graphql::Result<opportunities::Model> {
        todo!()
    }
    async fn product(&self, ctx: &Context<'_>) -> async_graphql::Result<products::Model> {
        todo!()
    }
}
