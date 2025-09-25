use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("wms")
    }
    fn table_name(&self) -> &str {
        "packages"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, async_graphql :: SimpleObject,
)]
#[graphql(name = "WmsPackage")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub sales_order_id: Uuid,
    pub package_number: String,
    pub warehouse_id: Uuid,
    pub package_type: Option<String>,
    pub weight: Option<f32>,
    pub length: Option<f32>,
    pub width: Option<f32>,
    pub height: Option<f32>,
    pub volume: Option<f32>,
    pub tracking_number: Option<String>,
    pub carrier: Option<String>,
    pub service_level: Option<String>,
    pub packed_by_user_id: Option<Uuid>,
    pub packed_at: Option<DateTime>,
    pub shipped_at: Option<DateTime>,
    pub is_fragile: Option<bool>,
    pub is_hazmat: Option<bool>,
    pub requires_signature: Option<bool>,
    pub insurance_value: Option<Decimal>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    SalesOrderId,
    PackageNumber,
    WarehouseId,
    PackageType,
    Weight,
    Length,
    Width,
    Height,
    Volume,
    TrackingNumber,
    Carrier,
    ServiceLevel,
    PackedByUserId,
    PackedAt,
    ShippedAt,
    IsFragile,
    IsHazmat,
    RequiresSignature,
    InsuranceValue,
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
    PackageItems,
    SalesOrders,
    User,
    Warehouses,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::SalesOrderId => ColumnType::Uuid.def(),
            Self::PackageNumber => ColumnType::String(StringLen::N(100u32)).def().unique(),
            Self::WarehouseId => ColumnType::Uuid.def(),
            Self::PackageType => ColumnType::String(StringLen::N(50u32)).def().null(),
            Self::Weight => ColumnType::Float.def().null(),
            Self::Length => ColumnType::Float.def().null(),
            Self::Width => ColumnType::Float.def().null(),
            Self::Height => ColumnType::Float.def().null(),
            Self::Volume => ColumnType::Float.def().null(),
            Self::TrackingNumber => ColumnType::String(StringLen::N(100u32)).def().null(),
            Self::Carrier => ColumnType::String(StringLen::N(100u32)).def().null(),
            Self::ServiceLevel => ColumnType::String(StringLen::N(50u32)).def().null(),
            Self::PackedByUserId => ColumnType::Uuid.def().null(),
            Self::PackedAt => ColumnType::DateTime.def().null(),
            Self::ShippedAt => ColumnType::DateTime.def().null(),
            Self::IsFragile => ColumnType::Boolean.def().null(),
            Self::IsHazmat => ColumnType::Boolean.def().null(),
            Self::RequiresSignature => ColumnType::Boolean.def().null(),
            Self::InsuranceValue => ColumnType::Decimal(Some((10u32, 2u32))).def().null(),
            Self::CreatedAt => ColumnType::DateTime.def().null(),
            Self::UpdatedAt => ColumnType::DateTime.def().null(),
        }
    }
}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        match self {
            Self::PackageItems => Entity::has_many(super::package_items::Entity).into(),
            Self::SalesOrders => Entity::belongs_to(super::sales_orders::Entity)
                .from(Column::SalesOrderId)
                .to(super::sales_orders::Column::Id)
                .into(),
            Self::User => Entity::belongs_to(super::user::Entity)
                .from(Column::PackedByUserId)
                .to(super::user::Column::Id)
                .into(),
            Self::Warehouses => Entity::belongs_to(super::warehouses::Entity)
                .from(Column::WarehouseId)
                .to(super::warehouses::Column::Id)
                .into(),
        }
    }
}

impl Related<super::package_items::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::PackageItems.def()
    }
}

impl Related<super::sales_orders::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::SalesOrders.def()
    }
}

impl Related<super::user::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::User.def()
    }
}

impl Related<super::warehouses::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Warehouses.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
