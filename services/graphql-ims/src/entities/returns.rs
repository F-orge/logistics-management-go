use crate::entities::_generated::returns;
use crate::entities::_generated::sea_orm_active_enums::ReturnStatusEnum;
use async_graphql::InputObject;
use chrono::{DateTime, Utc};
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
use fake::locales::EN;
use fake::faker::number::raw::NumberWithFormat;
use fake::faker::lorem::raw::Sentence;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertReturn {
    #[dummy(faker = "NumberWithFormat(EN, \"RET-#####\")")]
    pub return_number: String,
    
    pub sales_order_id: Option<Uuid>,
    
    pub client_id: Uuid,
    
    pub status: Option<ReturnStatusEnum>,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub reason: Option<String>,
    
    pub created_at: Option<DateTime<Utc>>,
    
    pub updated_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateReturn {
    pub return_number: Option<String>,
    pub sales_order_id: Option<Option<Uuid>>,
    pub client_id: Option<Uuid>,
    pub status: Option<Option<ReturnStatusEnum>>,
    pub reason: Option<Option<String>>,
    pub created_at: Option<Option<DateTime<Utc>>>,
    pub updated_at: Option<Option<DateTime<Utc>>>,
}

impl IntoActiveModel<returns::ActiveModel> for InsertReturn {
    fn into_active_model(self) -> returns::ActiveModel {
        let mut active_model = returns::ActiveModel::new();
        active_model.return_number = Set(self.return_number);
        active_model.sales_order_id = Set(self.sales_order_id);
        active_model.client_id = Set(self.client_id);
        active_model.status = Set(self.status);
        active_model.reason = Set(self.reason);
        active_model
    }
}

impl IntoActiveModel<returns::ActiveModel> for UpdateReturn {
    fn into_active_model(self) -> returns::ActiveModel {
        let mut active_model = returns::ActiveModel::new();
        active_model.return_number = self.return_number.map(Set).unwrap_or(NotSet);
        active_model.sales_order_id = self.sales_order_id.map(Set).unwrap_or(NotSet);
        active_model.client_id = self.client_id.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.reason = self.reason.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};
use crate::entities::_generated::{sales_orders, companies, return_items};

#[ComplexObject]
impl returns::Model {
    async fn sales_order(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<sales_orders::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(so_id) = self.sales_order_id {
            let res = sales_orders::Entity::find_by_id(so_id).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

    async fn client(&self, ctx: &Context<'_>) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = companies::Entity::find_by_id(self.client_id).one(db).await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Client not found")),
        }
    }

    async fn return_items(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<return_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = return_items::Entity::find()
            .filter(return_items::Column::ReturnId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

}
