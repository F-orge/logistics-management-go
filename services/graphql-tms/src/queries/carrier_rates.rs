use crate::entities::{
    _generated::carrier_rates,
    carrier_rates::{InsertCarrierRate, UpdateCarrierRate},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "CarrierRates")]
impl graphql_core::traits::GraphqlQuery<carrier_rates::Model, Uuid> for carrier_rates::Entity {
    #[graphql(name = "carrierRates")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<Vec<carrier_rates::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let carrier_rates = carrier_rates::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(carrier_rates)
    }
    #[graphql(name = "carrierRate")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<carrier_rates::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let carrier_rate = carrier_rates::Entity::find_by_id(id).one(db).await?;
        Ok(carrier_rate)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsCarrierRateMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        carrier_rates::Model,
        Uuid,
        InsertCarrierRate,
        UpdateCarrierRate,
    > for Mutations
{
    #[graphql(name = "createCarrierRate")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertCarrierRate,
    ) -> async_graphql::Result<carrier_rates::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_carrier_rate = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_carrier_rate)
    }
    #[graphql(name = "updateCarrierRate")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateCarrierRate,
    ) -> async_graphql::Result<carrier_rates::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_carrier_rate = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_carrier_rate)
    }
    #[graphql(name = "deleteCarrierRate")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let carrier_rate = carrier_rates::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find carrier rate"))?;
        let result = carrier_rate.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete carrier rate"));
        }
        Ok(true)
    }
}
