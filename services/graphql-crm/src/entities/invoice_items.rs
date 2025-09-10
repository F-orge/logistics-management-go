use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use sea_query::{Alias, Iden, InsertStatement, Query, UpdateStatement};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Iden)]
#[iden(rename = "invoice_items")]
pub enum InvoiceItems {
    Table,
    Id,
    InvoiceId,
    ProductId,
    Quantity,
    Price,
    CreatedAt,
    UpdatedAt,
}

#[derive(Clone, Debug, FromRow)]
pub struct InvoiceItemsTable {
    pub id: Uuid,
    pub invoice_id: Uuid,
    pub product_id: Uuid,
    pub quantity: i32,
    pub price: Decimal,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertInvoiceItemsInput {
    pub invoice_id: Uuid,
    pub product_id: Uuid,
    pub quantity: i32,
    pub price: Decimal,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateInvoiceItemsInput {
    pub invoice_id: Option<Uuid>,
    pub product_id: Option<Uuid>,
    pub quantity: Option<i32>,
    pub price: Option<Decimal>,
}

impl From<InsertInvoiceItemsInput> for InsertStatement {
    fn from(value: InsertInvoiceItemsInput) -> Self {
        Query::insert()
            .into_table((Alias::new("crm"), InvoiceItems::Table))
            .columns([
                InvoiceItems::InvoiceId,
                InvoiceItems::ProductId,
                InvoiceItems::Quantity,
                InvoiceItems::Price,
            ])
            .values([
                value.invoice_id.into(),
                value.product_id.into(),
                value.quantity.into(),
                value.price.to_string().into(),
            ])
            .expect("Failed to convert invoice_items input to sea-query")
            .to_owned()
    }
}

impl From<UpdateInvoiceItemsInput> for UpdateStatement {
    fn from(value: UpdateInvoiceItemsInput) -> Self {
        let mut stmt = Query::update();

        let mut stmt = stmt.table((Alias::new("crm"), InvoiceItems::Table));

        if let Some(invoice_id) = value.invoice_id {
            stmt = stmt.value(InvoiceItems::InvoiceId, invoice_id);
        }
        if let Some(product_id) = value.product_id {
            stmt = stmt.value(InvoiceItems::ProductId, product_id);
        }
        if let Some(quantity) = value.quantity {
            stmt = stmt.value(InvoiceItems::Quantity, quantity);
        }
        if let Some(price) = value.price {
            stmt = stmt.value(InvoiceItems::Price, price.to_string());
        }

        stmt.to_owned()
    }
}
