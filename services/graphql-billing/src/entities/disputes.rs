use crate::entities::_generated::disputes;
use crate::entities::_generated::sea_orm_active_enums::DisputeStatusEnum;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use sea_orm::{EntityTrait, ColumnTrait, QueryFilter};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertDispute {
    pub line_item_id: Uuid,
    pub client_id: Uuid,
    pub reason: String,
    pub status: Option<DisputeStatusEnum>,
    pub disputed_amount: Option<Decimal>,
    pub resolution_notes: Option<String>,
    pub submitted_at: Option<sea_orm::prelude::DateTime>,
    pub resolved_at: Option<sea_orm::prelude::DateTime>,
    pub resolved_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateDispute {
    pub line_item_id: Option<Uuid>,
    pub client_id: Option<Uuid>,
    pub reason: Option<String>,
    pub status: Option<Option<DisputeStatusEnum>>,
    pub disputed_amount: Option<Option<Decimal>>,
    pub resolution_notes: Option<Option<String>>,
    pub submitted_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub resolved_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub resolved_by_user_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<disputes::ActiveModel> for InsertDispute {
    fn into_active_model(self) -> disputes::ActiveModel {
        let mut active_model = disputes::ActiveModel::new();
        active_model.line_item_id = Set(self.line_item_id);
        active_model.client_id = Set(self.client_id);
        active_model.reason = Set(self.reason);
        active_model.status = Set(self.status);
        active_model.disputed_amount = Set(self.disputed_amount);
        active_model.resolution_notes = Set(self.resolution_notes);
        active_model.submitted_at = Set(self.submitted_at);
        active_model.resolved_at = Set(self.resolved_at);
        active_model.resolved_by_user_id = Set(self.resolved_by_user_id);
        active_model
    }
}

impl IntoActiveModel<disputes::ActiveModel> for UpdateDispute {
    fn into_active_model(self) -> disputes::ActiveModel {
        let mut active_model = disputes::ActiveModel::new();
        active_model.line_item_id = self.line_item_id.map(Set).unwrap_or(NotSet);
        active_model.client_id = self.client_id.map(Set).unwrap_or(NotSet);
        active_model.reason = self.reason.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.disputed_amount = self.disputed_amount.map(Set).unwrap_or(NotSet);
        active_model.resolution_notes = self.resolution_notes.map(Set).unwrap_or(NotSet);
        active_model.submitted_at = self.submitted_at.map(Set).unwrap_or(NotSet);
        active_model.resolved_at = self.resolved_at.map(Set).unwrap_or(NotSet);
        active_model.resolved_by_user_id = self.resolved_by_user_id.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl disputes::Model {
    async fn line_item(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<crate::entities::_generated::invoice_line_items::Model> {
        let db = ctx.data::<sea_orm::DatabaseConnection>()?;
        let res = crate::entities::_generated::invoice_line_items::Entity::find_by_id(self.line_item_id).one(db).await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("Invoice line item not found")),
        }
    }

    async fn client(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<crate::entities::_generated::companies::Model> {
        let db = ctx.data::<sea_orm::DatabaseConnection>()?;
        let res = crate::entities::_generated::companies::Entity::find_by_id(self.client_id).one(db).await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("Client not found")),
        }
    }

    async fn credit_notes(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<Vec<crate::entities::_generated::credit_notes::Model>> {
        use sea_orm::QueryFilter;
        use crate::entities::_generated::credit_notes::Column as CreditNotesColumn;
        let db = ctx.data::<sea_orm::DatabaseConnection>()?;
        let results = crate::entities::_generated::credit_notes::Entity::find()
            .filter(CreditNotesColumn::DisputeId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn resolved_by_user(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<Option<crate::entities::_generated::user::Model>> {
        let db = ctx.data::<sea_orm::DatabaseConnection>()?;
        if let Some(user_id) = self.resolved_by_user_id {
            let res = crate::entities::_generated::user::Entity::find_by_id(user_id).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }
}
