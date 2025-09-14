use crate::entities::{
    _generated::outbound_shipments,
    outbound_shipments::{InsertOutboundShipment, UpdateOutboundShipment},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "OutboundShipments")]
impl graphql_core::traits::GraphqlQuery<outbound_shipments::Model, Uuid>
    for outbound_shipments::Entity
{
    #[graphql(name = "outboundShipments")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<Vec<outbound_shipments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = outbound_shipments::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "outboundShipment")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<outbound_shipments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = outbound_shipments::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "ImsOutboundShipmentMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        outbound_shipments::Model,
        Uuid,
        InsertOutboundShipment,
        UpdateOutboundShipment,
    > for Mutations
{
    #[graphql(name = "createOutboundShipment")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertOutboundShipment,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateOutboundShipment")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateOutboundShipment,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteOutboundShipment")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = outbound_shipments::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new(
                "Unable to find outbound_shipment",
            ))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete outbound_shipment",
            ));
        }
        Ok(true)
    }
}
