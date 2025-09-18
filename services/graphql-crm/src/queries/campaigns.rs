use crate::entities::{
    _generated::campaigns,
    campaigns::{InsertCampaign, UpdateCampaign},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "Campaigns")]
impl graphql_core::traits::GraphqlQuery<campaigns::Model, Uuid> for campaigns::Entity {
    #[graphql(name = "campaigns")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<campaigns::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let campaigns = campaigns::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(campaigns)
    }
    #[graphql(name = "campaign")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<campaigns::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let campaign = campaigns::Entity::find_by_id(id).one(db).await?;
        Ok(campaign)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "CrmCampaignMutations")]
impl graphql_core::traits::GraphqlMutation<campaigns::Model, Uuid, InsertCampaign, UpdateCampaign>
    for Mutations
{
    #[graphql(name = "createCampaign")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertCampaign,
    ) -> async_graphql::Result<campaigns::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_campaign = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_campaign)
    }
    #[graphql(name = "updateCampaign")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateCampaign,
    ) -> async_graphql::Result<campaigns::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_campaign = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_campaign)
    }
    #[graphql(name = "deleteCampaign")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let campaign = campaigns::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find campaign"))?;
        let result = campaign.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete campaign"));
        }
        Ok(true)
    }
}
