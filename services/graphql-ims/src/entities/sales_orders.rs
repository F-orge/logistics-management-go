use crate::entities::_generated::sales_orders;
use crate::entities::_generated::sea_orm_active_enums::SalesOrderStatusEnum;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertSalesOrder {
    pub order_number: String,
    pub client_id: Uuid,
    pub crm_opportunity_id: Option<Uuid>,
    pub status: Option<SalesOrderStatusEnum>,
    pub shipping_address: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateSalesOrder {
    pub order_number: Option<String>,
    pub client_id: Option<Uuid>,
    pub crm_opportunity_id: Option<Option<Uuid>>,
    pub status: Option<Option<SalesOrderStatusEnum>>,
    pub shipping_address: Option<Option<String>>,
}

impl IntoActiveModel<sales_orders::ActiveModel> for InsertSalesOrder {
    fn into_active_model(self) -> sales_orders::ActiveModel {
        let mut active_model = sales_orders::ActiveModel::new();
        active_model.order_number = Set(self.order_number);
        active_model.client_id = Set(self.client_id);
        active_model.crm_opportunity_id = Set(self.crm_opportunity_id);
        active_model.status = Set(self.status);
        active_model.shipping_address = Set(self.shipping_address);
        active_model
    }
}

impl IntoActiveModel<sales_orders::ActiveModel> for UpdateSalesOrder {
    fn into_active_model(self) -> sales_orders::ActiveModel {
        let mut active_model = sales_orders::ActiveModel::new();
        active_model.order_number = self.order_number.map(Set).unwrap_or(NotSet);
        active_model.client_id = self.client_id.map(Set).unwrap_or(NotSet);
        active_model.crm_opportunity_id = self.crm_opportunity_id.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.shipping_address = self.shipping_address.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};
use crate::entities::_generated::{companies, opportunities, outbound_shipments, returns, sales_order_items};

#[ComplexObject]
impl sales_orders::Model {
    async fn client(&self, ctx: &Context<'_>) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = companies::Entity::find_by_id(self.client_id).one(db).await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Client not found")),
        }
    }

    async fn opportunity(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<opportunities::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(op_id) = self.crm_opportunity_id {
            let res = opportunities::Entity::find_by_id(op_id).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

    async fn outbound_shipments(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<outbound_shipments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = outbound_shipments::Entity::find()
            .filter(outbound_shipments::Column::SalesOrderId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn returns(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<returns::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = returns::Entity::find()
            .filter(returns::Column::SalesOrderId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn sales_order_items(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<sales_order_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = sales_order_items::Entity::find()
            .filter(sales_order_items::Column::SalesOrderId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

}
