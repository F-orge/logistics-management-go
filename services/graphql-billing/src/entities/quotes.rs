use crate::entities::_generated::quotes;
use crate::entities::_generated::sea_orm_active_enums::QuoteStatusEnum;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
    EntityTrait,
    ColumnTrait,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
use fake::locales::EN;
use fake::decimal::PositiveDecimal;
use fake::faker::lorem::raw::Sentence;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertQuote {
    pub client_id: Option<Uuid>,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub origin_details: String,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub destination_details: String,
    #[dummy(faker = "PositiveDecimal")]
    pub weight: Option<Decimal>,
    #[dummy(faker = "PositiveDecimal")]
    pub length: Option<Decimal>,
    #[dummy(faker = "PositiveDecimal")]
    pub width: Option<Decimal>,
    #[dummy(faker = "PositiveDecimal")]
    pub height: Option<Decimal>,
    #[dummy(faker = "PositiveDecimal")]
    pub volume: Option<Decimal>,
    #[dummy(faker = "PositiveDecimal")]
    pub quoted_price: Decimal,
    pub service_level: Option<String>,
    pub expires_at: Option<sea_orm::prelude::DateTime>,
    pub status: Option<QuoteStatusEnum>,
    pub quote_number: Option<String>,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub notes: Option<String>,
    pub created_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateQuote {
    pub client_id: Option<Option<Uuid>>,
    pub origin_details: Option<String>,
    pub destination_details: Option<String>,
    pub weight: Option<Option<Decimal>>,
    pub length: Option<Option<Decimal>>,
    pub width: Option<Option<Decimal>>,
    pub height: Option<Option<Decimal>>,
    pub volume: Option<Option<Decimal>>,
    pub quoted_price: Option<Decimal>,
    pub service_level: Option<Option<String>>,
    pub expires_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub status: Option<Option<QuoteStatusEnum>>,
    pub quote_number: Option<Option<String>>,
    pub notes: Option<Option<String>>,
    pub created_by_user_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<quotes::ActiveModel> for InsertQuote {
    fn into_active_model(self) -> quotes::ActiveModel {
        let mut active_model = quotes::ActiveModel::new();
        active_model.client_id = Set(self.client_id);
        active_model.origin_details = Set(self.origin_details);
        active_model.destination_details = Set(self.destination_details);
        active_model.weight = Set(self.weight);
        active_model.length = Set(self.length);
        active_model.width = Set(self.width);
        active_model.height = Set(self.height);
        active_model.volume = Set(self.volume);
        active_model.quoted_price = Set(self.quoted_price);
        active_model.service_level = Set(self.service_level);
        active_model.expires_at = Set(self.expires_at);
        active_model.status = Set(self.status);
        active_model.quote_number = Set(self.quote_number);
        active_model.notes = Set(self.notes);
        active_model.created_by_user_id = Set(self.created_by_user_id);
        active_model
    }
}

impl IntoActiveModel<quotes::ActiveModel> for UpdateQuote {
    fn into_active_model(self) -> quotes::ActiveModel {
        let mut active_model = quotes::ActiveModel::new();
        active_model.client_id = self.client_id.map(Set).unwrap_or(NotSet);
        active_model.origin_details = self.origin_details.map(Set).unwrap_or(NotSet);
        active_model.destination_details = self.destination_details.map(Set).unwrap_or(NotSet);
        active_model.weight = self.weight.map(Set).unwrap_or(NotSet);
        active_model.length = self.length.map(Set).unwrap_or(NotSet);
        active_model.width = self.width.map(Set).unwrap_or(NotSet);
        active_model.height = self.height.map(Set).unwrap_or(NotSet);
        active_model.volume = self.volume.map(Set).unwrap_or(NotSet);
        active_model.quoted_price = self.quoted_price.map(Set).unwrap_or(NotSet);
        active_model.service_level = self.service_level.map(Set).unwrap_or(NotSet);
        active_model.expires_at = self.expires_at.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.quote_number = self.quote_number.map(Set).unwrap_or(NotSet);
        active_model.notes = self.notes.map(Set).unwrap_or(NotSet);
        active_model.created_by_user_id = self.created_by_user_id.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl quotes::Model {
    async fn client(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<Option<crate::entities::_generated::companies::Model>> {
        let db = ctx.data::<sea_orm::DatabaseConnection>()?;
        if let Some(client_id) = self.client_id {
            let res = crate::entities::_generated::companies::Entity::find_by_id(client_id).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

    async fn invoices(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<Vec<crate::entities::_generated::invoices::Model>> {
        use sea_orm::QueryFilter;
        use crate::entities::_generated::invoices::Column as InvoicesColumn;
        let db = ctx.data::<sea_orm::DatabaseConnection>()?;
        let results = crate::entities::_generated::invoices::Entity::find()
            .filter(InvoicesColumn::QuoteId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn created_by_user(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<Option<crate::entities::_generated::user::Model>> {
        let db = ctx.data::<sea_orm::DatabaseConnection>()?;
        if let Some(user_id) = self.created_by_user_id {
            let res = crate::entities::_generated::user::Entity::find_by_id(user_id).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

}
