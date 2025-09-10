use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use sea_query::{Alias, Iden, InsertStatement, Query, UpdateStatement};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Iden)]
#[iden(rename = "products")]
pub enum Products {
    Table,
    Id,
    Name,
    Sku,
    Price,
    Type,
    Description,
    CreatedAt,
    UpdatedAt,
}

#[derive(Clone, Debug, FromRow)]
pub struct ProductsTable {
    pub id: Uuid,
    pub name: String,
    pub sku: Option<String>,
    pub price: Decimal,
    pub r#type: String,
    pub description: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertProductsInput {
    #[validate(length(min = 1))]
    pub name: String,
    pub sku: Option<String>,
    pub price: Decimal,
    pub r#type: Option<String>,
    pub description: Option<String>,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateProductsInput {
    #[validate(length(min = 1))]
    pub name: Option<String>,
    pub sku: Option<Option<String>>,
    pub price: Option<Decimal>,
    pub r#type: Option<String>,
    pub description: Option<Option<String>>,
}

impl From<InsertProductsInput> for InsertStatement {
    fn from(value: InsertProductsInput) -> Self {
        Query::insert()
            .into_table((Alias::new("crm"), Products::Table))
            .columns([
                Products::Name,
                Products::Sku,
                Products::Price,
                Products::Type,
                Products::Description,
            ])
            .values([
                value.name.into(),
                value.sku.into(),
                value.price.to_string().into(),
                value.r#type.into(),
                value.description.into(),
            ])
            .expect("Failed to convert products input to sea-query")
            .to_owned()
    }
}

impl From<UpdateProductsInput> for UpdateStatement {
    fn from(value: UpdateProductsInput) -> Self {
        let mut stmt = Query::update();

        let mut stmt = stmt.table((Alias::new("crm"), Products::Table));

        if let Some(name) = value.name {
            stmt = stmt.value(Products::Name, name);
        }
        if let Some(sku) = value.sku.flatten() {
            stmt = stmt.value(Products::Sku, sku);
        }
        if let Some(price) = value.price {
            stmt = stmt.value(Products::Price, price.to_string());
        }
        if let Some(r#type) = value.r#type {
            stmt = stmt.value(Products::Type, r#type);
        }
        if let Some(description) = value.description.flatten() {
            stmt = stmt.value(Products::Description, description);
        }

        stmt.to_owned()
    }
}
