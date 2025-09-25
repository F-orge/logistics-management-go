use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("crm")
    }
    fn table_name(&self) -> &str {
        "invoice_items"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "CrmInvoiceItem")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub invoice_id: Uuid,
    pub product_id: Uuid,
    pub quantity: i32,
    pub price: Decimal,
    pub created_at: Option<DateTimeWithTimeZone>,
    pub updated_at: Option<DateTimeWithTimeZone>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    InvoiceId,
    ProductId,
    Quantity,
    Price,
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
    Invoices,
    Products,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::InvoiceId => ColumnType::Uuid.def(),
            Self::ProductId => ColumnType::Uuid.def(),
            Self::Quantity => ColumnType::Integer.def(),
            Self::Price => ColumnType::Decimal(Some((10u32, 2u32))).def(),
            Self::CreatedAt => ColumnType::TimestampWithTimeZone.def().null(),
            Self::UpdatedAt => ColumnType::TimestampWithTimeZone.def().null(),
        }
    }
}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        match self {
            Self::Invoices => Entity::belongs_to(super::invoices::Entity)
                .from(Column::InvoiceId)
                .to(super::invoices::Column::Id)
                .into(),
            Self::Products => Entity::belongs_to(super::products::Entity)
                .from(Column::ProductId)
                .to(super::products::Column::Id)
                .into(),
        }
    }
}

impl Related<super::invoices::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Invoices.def()
    }
}

impl Related<super::products::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Products.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
