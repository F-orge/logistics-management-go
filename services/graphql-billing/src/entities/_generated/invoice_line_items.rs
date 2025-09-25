

use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("billing")
    }
    fn table_name(&self) -> &str {
        "invoice_line_items"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "BillingInvoiceLineItem")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub invoice_id: Uuid,
    pub source_record_id: Option<Uuid>,
    pub source_record_type: Option<String>,
    pub description: String,
    pub quantity: Decimal,
    pub unit_price: Decimal,
    pub total_price: Option<Decimal>,
    pub tax_rate: Option<Decimal>,
    pub tax_amount: Option<Decimal>,
    pub discount_rate: Option<Decimal>,
    pub discount_amount: Option<Decimal>,
    pub line_total: Option<Decimal>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    InvoiceId,
    SourceRecordId,
    SourceRecordType,
    Description,
    Quantity,
    UnitPrice,
    TotalPrice,
    TaxRate,
    TaxAmount,
    DiscountRate,
    DiscountAmount,
    LineTotal,
    CreatedAt,
    UpdatedAt,
}

#[derive(Copy, Clone, Debug, EnumIter, DerivePrimaryKey)]
pub enum PrimaryKey {
    Id,
}

impl PrimaryKeyTrait for PrimaryKey {
    type ValueType = Uuid;
    fn auto_increment() -> bool {
        false
    }
}

#[derive(Copy, Clone, Debug, EnumIter)]
pub enum Relation {
    Disputes,
    Invoices,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::InvoiceId => ColumnType::Uuid.def(),
            Self::SourceRecordId => ColumnType::Uuid.def().null(),
            Self::SourceRecordType => ColumnType::String(StringLen::N(50u32)).def().null(),
            Self::Description => ColumnType::Text.def(),
            Self::Quantity => ColumnType::Decimal(Some((10u32, 3u32))).def(),
            Self::UnitPrice => ColumnType::Decimal(Some((10u32, 2u32))).def(),
            Self::TotalPrice => ColumnType::Decimal(Some((12u32, 2u32))).def().null(),
            Self::TaxRate => ColumnType::Decimal(Some((5u32, 4u32))).def().null(),
            Self::TaxAmount => ColumnType::Decimal(Some((10u32, 2u32))).def().null(),
            Self::DiscountRate => ColumnType::Decimal(Some((5u32, 4u32))).def().null(),
            Self::DiscountAmount => ColumnType::Decimal(Some((10u32, 2u32))).def().null(),
            Self::LineTotal => ColumnType::Decimal(Some((12u32, 2u32))).def().null(),
            Self::CreatedAt => ColumnType::DateTime.def().null(),
            Self::UpdatedAt => ColumnType::DateTime.def().null(),
        }
    }
}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        match self {
            Self::Disputes => Entity::has_many(super::disputes::Entity).into(),
            Self::Invoices => Entity::belongs_to(super::invoices::Entity)
                .from(Column::InvoiceId)
                .to(super::invoices::Column::Id)
                .into(),
        }
    }
}

impl Related<super::disputes::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Disputes.def()
    }
}

impl Related<super::invoices::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Invoices.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
