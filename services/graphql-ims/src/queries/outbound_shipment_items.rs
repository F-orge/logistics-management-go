use crate::entities::{
    _generated::outbound_shipment_items,
    outbound_shipment_items::{InsertOutboundShipmentItem, UpdateOutboundShipmentItem},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "OutboundShipmentItems")]
impl graphql_core::traits::GraphqlQuery<outbound_shipment_items::Model, Uuid>
    for outbound_shipment_items::Entity
{
    #[graphql(name = "outboundShipmentItems")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<outbound_shipment_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = outbound_shipment_items::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "outboundShipmentItem")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<outbound_shipment_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = outbound_shipment_items::Entity::find_by_id(id)
            .one(db)
            .await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "ImsOutboundShipmentItemMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        outbound_shipment_items::Model,
        Uuid,
        InsertOutboundShipmentItem,
        UpdateOutboundShipmentItem,
    > for Mutations
{
    #[graphql(name = "createOutboundShipmentItem")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertOutboundShipmentItem,
    ) -> async_graphql::Result<outbound_shipment_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateOutboundShipmentItem")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateOutboundShipmentItem,
    ) -> async_graphql::Result<outbound_shipment_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteOutboundShipmentItem")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = outbound_shipment_items::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new(
                "Unable to find outbound_shipment_item",
            ))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete outbound_shipment_item",
            ));
        }
        Ok(true)
    }
}
