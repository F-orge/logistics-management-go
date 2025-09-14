use crate::entities::_generated::account_transactions;
use crate::entities::_generated::sea_orm_active_enums::TransactionTypeEnum;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertAccountTransaction {
    pub client_account_id: Uuid,
    pub r#type: TransactionTypeEnum,
    pub amount: Decimal,
    pub running_balance: Option<Decimal>,
    pub source_record_id: Option<Uuid>,
    pub source_record_type: Option<String>,
    pub description: Option<String>,
    pub reference_number: Option<String>,
    pub transaction_date: Option<sea_orm::prelude::DateTime>,
    pub processed_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateAccountTransaction {
    pub client_account_id: Option<Uuid>,
    pub r#type: Option<TransactionTypeEnum>,
    pub amount: Option<Decimal>,
    pub running_balance: Option<Option<Decimal>>,
    pub source_record_id: Option<Option<Uuid>>,
    pub source_record_type: Option<Option<String>>,
    pub description: Option<Option<String>>,
    pub reference_number: Option<Option<String>>,
    pub transaction_date: Option<Option<sea_orm::prelude::DateTime>>,
    pub processed_by_user_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<account_transactions::ActiveModel> for InsertAccountTransaction {
    fn into_active_model(self) -> account_transactions::ActiveModel {
        let mut active_model = account_transactions::ActiveModel::new();
        active_model.client_account_id = Set(self.client_account_id);
        active_model.r#type = Set(self.r#type);
        active_model.amount = Set(self.amount);
        active_model.running_balance = Set(self.running_balance);
        active_model.source_record_id = Set(self.source_record_id);
        active_model.source_record_type = Set(self.source_record_type);
        active_model.description = Set(self.description);
        active_model.reference_number = Set(self.reference_number);
        active_model.transaction_date = Set(self.transaction_date);
        active_model.processed_by_user_id = Set(self.processed_by_user_id);
        active_model
    }
}

impl IntoActiveModel<account_transactions::ActiveModel> for UpdateAccountTransaction {
    fn into_active_model(self) -> account_transactions::ActiveModel {
        let mut active_model = account_transactions::ActiveModel::new();
        active_model.client_account_id = self.client_account_id.map(Set).unwrap_or(NotSet);
        active_model.r#type = self.r#type.map(Set).unwrap_or(NotSet);
        active_model.amount = self.amount.map(Set).unwrap_or(NotSet);
        active_model.running_balance = self.running_balance.map(Set).unwrap_or(NotSet);
        active_model.source_record_id = self.source_record_id.map(Set).unwrap_or(NotSet);
        active_model.source_record_type = self.source_record_type.map(Set).unwrap_or(NotSet);
        active_model.description = self.description.map(Set).unwrap_or(NotSet);
        active_model.reference_number = self.reference_number.map(Set).unwrap_or(NotSet);
        active_model.transaction_date = self.transaction_date.map(Set).unwrap_or(NotSet);
        active_model.processed_by_user_id = self.processed_by_user_id.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::{ComplexObject, Context};
use sea_orm::{DatabaseConnection, EntityTrait};
use crate::entities::_generated::client_accounts;

#[ComplexObject]
impl account_transactions::Model {
    async fn client_account(&self, ctx: &Context<'_>) -> async_graphql::Result<client_accounts::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = client_accounts::Entity::find_by_id(self.client_account_id).one(db).await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("ClientAccount not found")),
        }
    }
}
