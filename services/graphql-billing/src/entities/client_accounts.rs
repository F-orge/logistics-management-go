use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

use crate::entities::_generated::client_accounts;

#[derive(Debug, Clone, InputObject)]
pub struct InsertClientAccount {
    pub client_id: Uuid,
    pub credit_limit: Option<Decimal>,
    pub available_credit: Option<Decimal>,
    pub wallet_balance: Option<Decimal>,
    pub currency: Option<String>,
    pub payment_terms_days: Option<i32>,
    pub is_credit_approved: Option<bool>,
    pub last_payment_date: Option<sea_orm::prelude::Date>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateClientAccount {
    pub client_id: Option<Uuid>,
    pub credit_limit: Option<Option<Decimal>>,
    pub available_credit: Option<Option<Decimal>>,
    pub wallet_balance: Option<Option<Decimal>>,
    pub currency: Option<Option<String>>,
    pub payment_terms_days: Option<Option<i32>>,
    pub is_credit_approved: Option<Option<bool>>,
    pub last_payment_date: Option<Option<sea_orm::prelude::Date>>,
}

impl IntoActiveModel<client_accounts::ActiveModel> for InsertClientAccount {
    fn into_active_model(self) -> client_accounts::ActiveModel {
        let mut active_model = client_accounts::ActiveModel::new();
        active_model.client_id = Set(self.client_id);
        active_model.credit_limit = Set(self.credit_limit);
        active_model.available_credit = Set(self.available_credit);
        active_model.wallet_balance = Set(self.wallet_balance);
        active_model.currency = Set(self.currency);
        active_model.payment_terms_days = Set(self.payment_terms_days);
        active_model.is_credit_approved = Set(self.is_credit_approved);
        active_model.last_payment_date = Set(self.last_payment_date);
        active_model
    }
}

impl IntoActiveModel<client_accounts::ActiveModel> for UpdateClientAccount {
    fn into_active_model(self) -> client_accounts::ActiveModel {
        let mut active_model = client_accounts::ActiveModel::new();
        active_model.client_id = self.client_id.map(Set).unwrap_or(NotSet);
        active_model.credit_limit = self.credit_limit.map(Set).unwrap_or(NotSet);
        active_model.available_credit = self.available_credit.map(Set).unwrap_or(NotSet);
        active_model.wallet_balance = self.wallet_balance.map(Set).unwrap_or(NotSet);
        active_model.currency = self.currency.map(Set).unwrap_or(NotSet);
        active_model.payment_terms_days = self.payment_terms_days.map(Set).unwrap_or(NotSet);
        active_model.is_credit_approved = self.is_credit_approved.map(Set).unwrap_or(NotSet);
        active_model.last_payment_date = self.last_payment_date.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};
use crate::entities::_generated::{account_transactions, companies};

#[ComplexObject]
impl client_accounts::Model {
    async fn account_transactions(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<account_transactions::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = account_transactions::Entity::find()
            .filter(account_transactions::Column::ClientAccountId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn client(&self, ctx: &Context<'_>) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = companies::Entity::find_by_id(self.client_id).one(db).await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("Client not found")),
        }
    }
}
