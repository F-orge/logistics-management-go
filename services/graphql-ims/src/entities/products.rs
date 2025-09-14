use crate::entities::_generated::products;
use crate::entities::_generated::sea_orm_active_enums::ProductStatusEnum;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertProduct {
    pub name: String,
    pub sku: String,
    pub barcode: Option<String>,
    pub description: Option<String>,
    pub cost_price: Option<Decimal>,
    pub length: Option<f32>,
    pub width: Option<f32>,
    pub height: Option<f32>,
    pub volume: Option<f32>,
    pub weight: Option<f32>,
    pub status: Option<ProductStatusEnum>,
    pub supplier_id: Option<Uuid>,
    pub client_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateProduct {
    pub name: Option<String>,
    pub sku: Option<String>,
    pub barcode: Option<Option<String>>,
    pub description: Option<Option<String>>,
    pub cost_price: Option<Option<Decimal>>,
    pub length: Option<Option<f32>>,
    pub width: Option<Option<f32>>,
    pub height: Option<Option<f32>>,
    pub volume: Option<Option<f32>>,
    pub weight: Option<Option<f32>>,
    pub status: Option<Option<ProductStatusEnum>>,
    pub supplier_id: Option<Option<Uuid>>,
    pub client_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<products::ActiveModel> for InsertProduct {
    fn into_active_model(self) -> products::ActiveModel {
        let mut active_model = products::ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.sku = Set(self.sku);
        active_model.barcode = Set(self.barcode);
        active_model.description = Set(self.description);
        active_model.cost_price = Set(self.cost_price);
        active_model.length = Set(self.length);
        active_model.width = Set(self.width);
        active_model.height = Set(self.height);
        active_model.volume = Set(self.volume);
        active_model.weight = Set(self.weight);
        active_model.status = Set(self.status);
        active_model.supplier_id = Set(self.supplier_id);
        active_model.client_id = Set(self.client_id);
        active_model
    }
}

impl IntoActiveModel<products::ActiveModel> for UpdateProduct {
    fn into_active_model(self) -> products::ActiveModel {
        let mut active_model = products::ActiveModel::new();
        active_model.name = self.name.map(Set).unwrap_or(NotSet);
        active_model.sku = self.sku.map(Set).unwrap_or(NotSet);
        active_model.barcode = self.barcode.map(Set).unwrap_or(NotSet);
        active_model.description = self.description.map(Set).unwrap_or(NotSet);
        active_model.cost_price = self.cost_price.map(Set).unwrap_or(NotSet);
        active_model.length = self.length.map(Set).unwrap_or(NotSet);
        active_model.width = self.width.map(Set).unwrap_or(NotSet);
        active_model.height = self.height.map(Set).unwrap_or(NotSet);
        active_model.volume = self.volume.map(Set).unwrap_or(NotSet);
        active_model.weight = self.weight.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.supplier_id = self.supplier_id.map(Set).unwrap_or(NotSet);
        active_model.client_id = self.client_id.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{
    companies, inbound_shipment_items, inventory_adjustments, inventory_batches,
    outbound_shipment_items, reorder_points, return_items, sales_order_items, stock_transfers,
    suppliers,
};
use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};

#[ComplexObject]
impl products::Model {
    async fn supplier(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<suppliers::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(supplier_id) = self.supplier_id {
            let res = suppliers::Entity::find_by_id(supplier_id).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

    async fn company(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<companies::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(client_id) = self.client_id {
            let res = companies::Entity::find_by_id(client_id).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

    async fn inbound_shipment_items(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<inbound_shipment_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = inbound_shipment_items::Entity::find()
            .filter(inbound_shipment_items::Column::ProductId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn inventory_adjustments(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<inventory_adjustments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = inventory_adjustments::Entity::find()
            .filter(inventory_adjustments::Column::ProductId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn inventory_batches(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<inventory_batches::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = inventory_batches::Entity::find()
            .filter(inventory_batches::Column::ProductId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn outbound_shipment_items(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<outbound_shipment_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = outbound_shipment_items::Entity::find()
            .filter(outbound_shipment_items::Column::ProductId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn reorder_points(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<reorder_points::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = reorder_points::Entity::find()
            .filter(reorder_points::Column::ProductId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn return_items(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<return_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = return_items::Entity::find()
            .filter(return_items::Column::ProductId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn sales_order_items(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<sales_order_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = sales_order_items::Entity::find()
            .filter(sales_order_items::Column::ProductId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn stock_transfers(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<stock_transfers::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = stock_transfers::Entity::find()
            .filter(stock_transfers::Column::ProductId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }
}
