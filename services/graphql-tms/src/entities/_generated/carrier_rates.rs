use super::sea_orm_active_enums::CarrierRateUnitEnum;
use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("tms")
    }
    fn table_name(&self) -> &str {
        "carrier_rates"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "TmsCarrierRate")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub carrier_id: Uuid,
    pub service_type: Option<String>,
    pub origin: Option<String>,
    pub destination: Option<String>,
    pub rate: Decimal,
    pub unit: Option<CarrierRateUnitEnum>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    CarrierId,
    ServiceType,
    Origin,
    Destination,
    Rate,
    Unit,
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
    Carriers,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::CarrierId => ColumnType::Uuid.def(),
            Self::ServiceType => ColumnType::String(StringLen::N(100u32)).def().null(),
            Self::Origin => ColumnType::String(StringLen::N(255u32)).def().null(),
            Self::Destination => ColumnType::String(StringLen::N(255u32)).def().null(),
            Self::Rate => ColumnType::Decimal(Some((10u32, 2u32))).def(),
            Self::Unit => CarrierRateUnitEnum::db_type()
                .get_column_type()
                .to_owned()
                .def()
                .null(),
            Self::CreatedAt => ColumnType::DateTime.def().null(),
            Self::UpdatedAt => ColumnType::DateTime.def().null(),
        }
    }
}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        match self {
            Self::Carriers => Entity::belongs_to(super::carriers::Entity)
                .from(Column::CarrierId)
                .to(super::carriers::Column::Id)
                .into(),
        }
    }
}

impl Related<super::carriers::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Carriers.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
