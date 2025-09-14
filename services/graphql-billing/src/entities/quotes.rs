use crate::entities::_generated::quotes;
use crate::entities::_generated::sea_orm_active_enums::QuoteStatusEnum;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertQuote {
    pub client_id: Option<Uuid>,
    pub origin_details: String,
    pub destination_details: String,
    pub weight: Option<Decimal>,
    pub length: Option<Decimal>,
    pub width: Option<Decimal>,
    pub height: Option<Decimal>,
    pub volume: Option<Decimal>,
    pub quoted_price: Decimal,
    pub service_level: Option<String>,
    pub expires_at: Option<sea_orm::prelude::DateTime>,
    pub status: Option<QuoteStatusEnum>,
    pub quote_number: Option<String>,
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
