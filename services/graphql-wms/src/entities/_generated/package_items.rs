use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("wms")
    }
    fn table_name(&self) -> &str {
        "package_items"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, async_graphql :: SimpleObject,
)]
#[graphql(name = "WmsPackageItem")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub package_id: Uuid,
    pub product_id: Uuid,
    pub batch_id: Option<Uuid>,
    pub quantity: i32,
    pub lot_number: Option<String>,
    pub serial_numbers: Option<Vec<String>>,
    pub expiry_date: Option<Date>,
    pub unit_weight: Option<f32>,
    pub total_weight: Option<f32>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    PackageId,
    ProductId,
    BatchId,
    Quantity,
    LotNumber,
    SerialNumbers,
    ExpiryDate,
    UnitWeight,
    TotalWeight,
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
    InventoryBatches,
    Packages,
    Products,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::PackageId => ColumnType::Uuid.def(),
            Self::ProductId => ColumnType::Uuid.def(),
            Self::BatchId => ColumnType::Uuid.def().null(),
            Self::Quantity => ColumnType::Integer.def(),
            Self::LotNumber => ColumnType::String(StringLen::N(100u32)).def().null(),
            Self::SerialNumbers => ColumnType::Array(RcOrArc::new(ColumnType::Text))
                .def()
                .null(),
            Self::ExpiryDate => ColumnType::Date.def().null(),
            Self::UnitWeight => ColumnType::Float.def().null(),
            Self::TotalWeight => ColumnType::Float.def().null(),
            Self::CreatedAt => ColumnType::DateTime.def().null(),
            Self::UpdatedAt => ColumnType::DateTime.def().null(),
        }
    }
}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        match self {
            Self::InventoryBatches => Entity::belongs_to(super::inventory_batches::Entity)
                .from(Column::BatchId)
                .to(super::inventory_batches::Column::Id)
                .into(),
            Self::Packages => Entity::belongs_to(super::packages::Entity)
                .from(Column::PackageId)
                .to(super::packages::Column::Id)
                .into(),
            Self::Products => Entity::belongs_to(super::products::Entity)
                .from(Column::ProductId)
                .to(super::products::Column::Id)
                .into(),
        }
    }
}

impl Related<super::inventory_batches::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::InventoryBatches.def()
    }
}

impl Related<super::packages::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Packages.def()
    }
}

impl Related<super::products::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Products.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
