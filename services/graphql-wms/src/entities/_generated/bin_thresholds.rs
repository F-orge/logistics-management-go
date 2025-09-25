

use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("wms")
    }
    fn table_name(&self) -> &str {
        "bin_thresholds"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "WmsBinThreshold")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub location_id: Uuid,
    pub product_id: Uuid,
    pub min_quantity: i32,
    pub max_quantity: i32,
    pub reorder_quantity: Option<i32>,
    pub alert_threshold: Option<i32>,
    pub is_active: Option<bool>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    LocationId,
    ProductId,
    MinQuantity,
    MaxQuantity,
    ReorderQuantity,
    AlertThreshold,
    IsActive,
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
    Locations,
    Products,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::LocationId => ColumnType::Uuid.def(),
            Self::ProductId => ColumnType::Uuid.def(),
            Self::MinQuantity => ColumnType::Integer.def(),
            Self::MaxQuantity => ColumnType::Integer.def(),
            Self::ReorderQuantity => ColumnType::Integer.def().null(),
            Self::AlertThreshold => ColumnType::Integer.def().null(),
            Self::IsActive => ColumnType::Boolean.def().null(),
            Self::CreatedAt => ColumnType::DateTime.def().null(),
            Self::UpdatedAt => ColumnType::DateTime.def().null(),
        }
    }
}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        match self {
            Self::Locations => Entity::belongs_to(super::locations::Entity)
                .from(Column::LocationId)
                .to(super::locations::Column::Id)
                .into(),
            Self::Products => Entity::belongs_to(super::products::Entity)
                .from(Column::ProductId)
                .to(super::products::Column::Id)
                .into(),
        }
    }
}

impl Related<super::locations::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Locations.def()
    }
}

impl Related<super::products::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Products.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
