use sea_query::{Alias, Iden, InsertStatement, Query, UpdateStatement};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Iden)]
#[iden(rename = "opportunity_products")]
pub enum OpportunityProducts {
    Table,
    OpportunityId,
    ProductId,
    Quantity,
}

#[derive(Clone, Debug, FromRow)]
pub struct OpportunityProductsTable {
    pub opportunity_id: Uuid,
    pub product_id: Uuid,
    pub quantity: i32,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertOpportunityProductsInput {
    pub opportunity_id: Uuid,
    pub product_id: Uuid,
    pub quantity: i32,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateOpportunityProductsInput {
    pub quantity: Option<i32>,
}

impl From<InsertOpportunityProductsInput> for InsertStatement {
    fn from(value: InsertOpportunityProductsInput) -> Self {
        Query::insert()
            .into_table((Alias::new("crm"), OpportunityProducts::Table))
            .columns([
                OpportunityProducts::OpportunityId,
                OpportunityProducts::ProductId,
                OpportunityProducts::Quantity,
            ])
            .values([
                value.opportunity_id.into(),
                value.product_id.into(),
                value.quantity.into(),
            ])
            .expect("Failed to convert opportunity_products input to sea-query")
            .to_owned()
    }
}

impl From<UpdateOpportunityProductsInput> for UpdateStatement {
    fn from(value: UpdateOpportunityProductsInput) -> Self {
        let mut stmt = Query::update();

        let mut stmt = stmt.table((Alias::new("crm"), OpportunityProducts::Table));

        if let Some(quantity) = value.quantity {
            stmt = stmt.value(OpportunityProducts::Quantity, quantity);
        }

        stmt.to_owned()
    }
}
