use crate::entities::{
    _generated::proof_of_deliveries,
    proof_of_deliveries::{InsertProofOfDelivery, UpdateProofOfDelivery},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "ProofOfDeliveries")]
impl graphql_core::traits::GraphqlQuery<proof_of_deliveries::Model, Uuid>
    for proof_of_deliveries::Entity
{
    #[graphql(name = "proofOfDeliveries")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<proof_of_deliveries::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let proof_of_deliveries = proof_of_deliveries::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(proof_of_deliveries)
    }
    #[graphql(name = "proofOfDelivery")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<proof_of_deliveries::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let proof_of_delivery = proof_of_deliveries::Entity::find_by_id(id).one(db).await?;
        Ok(proof_of_delivery)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsProofOfDeliveryMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        proof_of_deliveries::Model,
        Uuid,
        InsertProofOfDelivery,
        UpdateProofOfDelivery,
    > for Mutations
{
    #[graphql(name = "createProofOfDelivery")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertProofOfDelivery,
    ) -> async_graphql::Result<proof_of_deliveries::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_proof_of_delivery = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_proof_of_delivery)
    }
    #[graphql(name = "updateProofOfDelivery")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateProofOfDelivery,
    ) -> async_graphql::Result<proof_of_deliveries::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_proof_of_delivery = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_proof_of_delivery)
    }
    #[graphql(name = "deleteProofOfDelivery")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let proof_of_delivery = proof_of_deliveries::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new(
                "Unable to find proof of delivery",
            ))?;
        let result = proof_of_delivery.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete proof of delivery",
            ));
        }
        Ok(true)
    }
}
