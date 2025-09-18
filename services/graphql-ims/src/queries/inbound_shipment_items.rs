use crate::entities::{
    _generated::inbound_shipment_items,
    inbound_shipment_items::{InsertInboundShipmentItem, UpdateInboundShipmentItem},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "InboundShipmentItems")]
impl graphql_core::traits::GraphqlQuery<inbound_shipment_items::Model, Uuid>
    for inbound_shipment_items::Entity
{
    #[graphql(name = "inboundShipmentItems")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<inbound_shipment_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = inbound_shipment_items::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "inboundShipmentItem")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<inbound_shipment_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = inbound_shipment_items::Entity::find_by_id(id)
            .one(db)
            .await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "ImsInboundShipmentItemMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        inbound_shipment_items::Model,
        Uuid,
        InsertInboundShipmentItem,
        UpdateInboundShipmentItem,
    > for Mutations
{
    #[graphql(name = "createInboundShipmentItem")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertInboundShipmentItem,
    ) -> async_graphql::Result<inbound_shipment_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateInboundShipmentItem")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateInboundShipmentItem,
    ) -> async_graphql::Result<inbound_shipment_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteInboundShipmentItem")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = inbound_shipment_items::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new(
                "Unable to find inbound_shipment_item",
            ))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete inbound_shipment_item",
            ));
        }
        Ok(true)
    }
}
