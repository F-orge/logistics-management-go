use crate::entities::_generated::invoices;
use crate::entities::_generated::sea_orm_active_enums::{InvoiceStatus, PaymentMethod};
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::prelude::*;
use sea_orm::prelude::{Date, DateTimeWithTimeZone};
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

use fake::Dummy;
use fake::decimal::PositiveDecimal;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertInvoice {
    #[dummy(default)]
    pub opportunity_id: Option<Uuid>,
    #[dummy(default)]
    pub status: Option<InvoiceStatus>,
    #[dummy(faker = "PositiveDecimal")]
    pub total: Option<Decimal>,
    #[dummy(default)]
    pub issue_date: Option<Date>,
    #[dummy(default)]
    pub due_date: Option<Date>,
    #[dummy(default)]
    pub sent_at: Option<DateTimeWithTimeZone>,
    #[dummy(default)]
    pub paid_at: Option<DateTimeWithTimeZone>,
    #[dummy(default)]
    pub payment_method: Option<PaymentMethod>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateInvoice {
    pub opportunity_id: Option<Option<Uuid>>,
    pub status: Option<Option<InvoiceStatus>>,
    pub total: Option<Option<Decimal>>,
    pub issue_date: Option<Option<Date>>,
    pub due_date: Option<Option<Date>>,
    pub sent_at: Option<Option<DateTimeWithTimeZone>>,
    pub paid_at: Option<Option<DateTimeWithTimeZone>>,
    pub payment_method: Option<Option<PaymentMethod>>,
}

impl IntoActiveModel<invoices::ActiveModel> for InsertInvoice {
    fn into_active_model(self) -> invoices::ActiveModel {
        let mut active_model = invoices::ActiveModel::new();
        active_model.opportunity_id = Set(self.opportunity_id);
        active_model.status = Set(self.status);
        active_model.total = Set(self.total);
        active_model.issue_date = Set(self.issue_date);
        active_model.due_date = Set(self.due_date);
        active_model.sent_at = Set(self.sent_at);
        active_model.paid_at = Set(self.paid_at);
        active_model.payment_method = Set(self.payment_method);
        active_model
    }
}

impl IntoActiveModel<invoices::ActiveModel> for UpdateInvoice {
    fn into_active_model(self) -> invoices::ActiveModel {
        let mut active_model = invoices::ActiveModel::new();
        active_model.opportunity_id = self.opportunity_id.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.total = self.total.map(Set).unwrap_or(NotSet);
        active_model.issue_date = self.issue_date.map(Set).unwrap_or(NotSet);
        active_model.due_date = self.due_date.map(Set).unwrap_or(NotSet);
        active_model.sent_at = self.sent_at.map(Set).unwrap_or(NotSet);
        active_model.paid_at = self.paid_at.map(Set).unwrap_or(NotSet);
        active_model.payment_method = self.payment_method.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{invoice_items, opportunities};
use async_graphql::{ComplexObject, Context};

#[ComplexObject]
impl invoices::Model {
    async fn invoice_items(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<invoice_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = invoice_items::Entity::find()
            .filter(invoice_items::Column::InvoiceId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn opportunity(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<opportunities::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(opportunity_id) = self.opportunity_id {
            let result = opportunities::Entity::find_by_id(opportunity_id)
                .one(db)
                .await?;
            Ok(result)
        } else {
            Ok(None)
        }
    }
}
