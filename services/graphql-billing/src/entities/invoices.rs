use crate::entities::_generated::invoices;
use crate::entities::_generated::sea_orm_active_enums::InvoiceStatusEnum;
use async_graphql::InputObject;
use rust_decimal::Decimal;
// --- fake imports ---
use fake::Dummy;
use fake::locales::EN;
use fake::decimal::PositiveDecimal;
use fake::faker::lorem::raw::{Sentence, Word};
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertInvoice {
    pub client_id: Uuid,
    pub quote_id: Option<Uuid>,
    #[dummy(faker = "Word(EN)")]
    pub invoice_number: String,
    pub status: Option<InvoiceStatusEnum>,
    pub issue_date: sea_orm::prelude::Date,
    pub due_date: sea_orm::prelude::Date,
    #[dummy(faker = "PositiveDecimal")]
    pub total_amount: Decimal,
    #[dummy(faker = "PositiveDecimal")]
    pub amount_paid: Option<Decimal>,
    #[dummy(faker = "PositiveDecimal")]
    pub amount_outstanding: Option<Decimal>,
    #[dummy(faker = "Word(EN)")]
    pub currency: Option<String>,
    #[dummy(faker = "PositiveDecimal")]
    pub tax_amount: Option<Decimal>,
    #[dummy(faker = "PositiveDecimal")]
    pub discount_amount: Option<Decimal>,
    #[dummy(faker = "PositiveDecimal")]
    pub subtotal: Option<Decimal>,
    #[dummy(faker = "Word(EN)")]
    pub payment_terms: Option<String>,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub notes: Option<String>,
    pub sent_at: Option<sea_orm::prelude::DateTime>,
    pub paid_at: Option<sea_orm::prelude::DateTime>,
    pub created_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateInvoice {
    pub client_id: Option<Uuid>,
    pub quote_id: Option<Option<Uuid>>,
    pub invoice_number: Option<String>,
    pub status: Option<Option<InvoiceStatusEnum>>,
    pub issue_date: Option<sea_orm::prelude::Date>,
    pub due_date: Option<sea_orm::prelude::Date>,
    pub total_amount: Option<Decimal>,
    pub amount_paid: Option<Option<Decimal>>,
    pub amount_outstanding: Option<Option<Decimal>>,
    pub currency: Option<Option<String>>,
    pub tax_amount: Option<Option<Decimal>>,
    pub discount_amount: Option<Option<Decimal>>,
    pub subtotal: Option<Option<Decimal>>,
    pub payment_terms: Option<Option<String>>,
    pub notes: Option<Option<String>>,
    pub sent_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub paid_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub created_by_user_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<invoices::ActiveModel> for InsertInvoice {
    fn into_active_model(self) -> invoices::ActiveModel {
        let mut active_model = invoices::ActiveModel::new();
        active_model.client_id = Set(self.client_id);
        active_model.quote_id = Set(self.quote_id);
        active_model.invoice_number = Set(self.invoice_number);
        active_model.status = Set(self.status);
        active_model.issue_date = Set(self.issue_date);
        active_model.due_date = Set(self.due_date);
        active_model.total_amount = Set(self.total_amount);
        active_model.amount_paid = Set(self.amount_paid);
        active_model.amount_outstanding = Set(self.amount_outstanding);
        active_model.currency = Set(self.currency);
        active_model.tax_amount = Set(self.tax_amount);
        active_model.discount_amount = Set(self.discount_amount);
        active_model.subtotal = Set(self.subtotal);
        active_model.payment_terms = Set(self.payment_terms);
        active_model.notes = Set(self.notes);
        active_model.sent_at = Set(self.sent_at);
        active_model.paid_at = Set(self.paid_at);
        active_model.created_by_user_id = Set(self.created_by_user_id);
        active_model
    }
}

impl IntoActiveModel<invoices::ActiveModel> for UpdateInvoice {
    fn into_active_model(self) -> invoices::ActiveModel {
        let mut active_model = invoices::ActiveModel::new();
        active_model.client_id = self.client_id.map(Set).unwrap_or(NotSet);
        active_model.quote_id = self.quote_id.map(Set).unwrap_or(NotSet);
        active_model.invoice_number = self.invoice_number.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.issue_date = self.issue_date.map(Set).unwrap_or(NotSet);
        active_model.due_date = self.due_date.map(Set).unwrap_or(NotSet);
        active_model.total_amount = self.total_amount.map(Set).unwrap_or(NotSet);
        active_model.amount_paid = self.amount_paid.map(Set).unwrap_or(NotSet);
        active_model.amount_outstanding = self.amount_outstanding.map(Set).unwrap_or(NotSet);
        active_model.currency = self.currency.map(Set).unwrap_or(NotSet);
        active_model.tax_amount = self.tax_amount.map(Set).unwrap_or(NotSet);
        active_model.discount_amount = self.discount_amount.map(Set).unwrap_or(NotSet);
        active_model.subtotal = self.subtotal.map(Set).unwrap_or(NotSet);
        active_model.payment_terms = self.payment_terms.map(Set).unwrap_or(NotSet);
        active_model.notes = self.notes.map(Set).unwrap_or(NotSet);
        active_model.sent_at = self.sent_at.map(Set).unwrap_or(NotSet);
        active_model.paid_at = self.paid_at.map(Set).unwrap_or(NotSet);
        active_model.created_by_user_id = self.created_by_user_id.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::companies;
use crate::entities::_generated::{credit_notes, invoice_line_items, payments, quotes};
use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};

#[ComplexObject]
impl invoices::Model {
    async fn invoice_line_items(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<invoice_line_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = invoice_line_items::Entity::find()
            .filter(invoice_line_items::Column::InvoiceId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn payments(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<payments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = payments::Entity::find()
            .filter(payments::Column::InvoiceId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn credit_notes(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<credit_notes::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = credit_notes::Entity::find()
            .filter(credit_notes::Column::InvoiceId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn quote(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<quotes::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(qid) = self.quote_id {
            let res = quotes::Entity::find_by_id(qid).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

    async fn client(&self, ctx: &Context<'_>) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = companies::Entity::find_by_id(self.client_id)
            .one(db)
            .await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("Client not found")),
        }
    }
}
