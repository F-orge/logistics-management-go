use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

use crate::entities::{
    _generated::payments,
    payments::{InsertPayment, UpdatePayment},
};

#[Object(name = "Payments")]
impl graphql_core::traits::GraphqlQuery<payments::Model, Uuid> for payments::Entity {
    #[graphql(name = "payments")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<payments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = payments::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "payment")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<payments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payments::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "BillingPaymentMutations")]
impl graphql_core::traits::GraphqlMutation<payments::Model, Uuid, InsertPayment, UpdatePayment>
    for Mutations
{
    #[graphql(name = "createPayment")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertPayment,
    ) -> async_graphql::Result<payments::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updatePayment")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdatePayment,
    ) -> async_graphql::Result<payments::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deletePayment")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = payments::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find payment"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete payment"));
        }
        Ok(true)
    }
}
