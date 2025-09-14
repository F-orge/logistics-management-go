use crate::entities::{
    _generated::inbound_shipments,
    inbound_shipments::{InsertInboundShipment, UpdateInboundShipment},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "InboundShipments")]
impl graphql_core::traits::GraphqlQuery<inbound_shipments::Model, Uuid>
    for inbound_shipments::Entity
{
    #[graphql(name = "inboundShipments")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<Vec<inbound_shipments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = inbound_shipments::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "inboundShipment")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<inbound_shipments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = inbound_shipments::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "ImsInboundShipmentMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        inbound_shipments::Model,
        Uuid,
        InsertInboundShipment,
        UpdateInboundShipment,
    > for Mutations
{
    #[graphql(name = "createInboundShipment")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertInboundShipment,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateInboundShipment")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateInboundShipment,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteInboundShipment")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = inbound_shipments::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find inbound_shipment"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete inbound_shipment",
            ));
        }
        Ok(true)
    }
}
