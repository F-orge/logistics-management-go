use crate::entities::{
    _generated::opportunity_products,
    opportunity_products::{InsertOpportunityProduct, UpdateOpportunityProduct},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "OpportunityProducts")]
impl GraphqlQuery<opportunity_products::Model, Uuid> for opportunity_products::Entity {
    #[graphql(name = "opportunityProducts")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<opportunity_products::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let opportunity_products = opportunity_products::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(opportunity_products)
    }
    #[graphql(name = "opportunityProduct")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<opportunity_products::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let opportunity_product = opportunity_products::Entity::find_by_id(id).one(db).await?;
        Ok(opportunity_product)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "CrmOpportunityProductMutations")]
impl
    GraphqlMutation<
        opportunity_products::Model,
        Uuid,
        InsertOpportunityProduct,
        UpdateOpportunityProduct,
    > for Mutations
{
    #[graphql(name = "createOpportunityProduct")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertOpportunityProduct,
    ) -> async_graphql::Result<opportunity_products::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_opportunity_product = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_opportunity_product)
    }
    #[graphql(name = "updateOpportunityProduct")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateOpportunityProduct,
    ) -> async_graphql::Result<opportunity_products::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_opportunity_product = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_opportunity_product)
    }
    #[graphql(name = "deleteOpportunityProduct")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let opportunity_product = opportunity_products::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new(
                "Unable to find opportunity product",
            ))?;
        let result = opportunity_product.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete opportunity product",
            ));
        }
        Ok(true)
    }
}
