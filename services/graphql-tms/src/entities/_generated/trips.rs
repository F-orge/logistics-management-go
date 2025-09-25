use super::sea_orm_active_enums::TripStatusEnum;
use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("tms")
    }
    fn table_name(&self) -> &str {
        "trips"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "TmsTrip")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub driver_id: Option<Uuid>,
    pub vehicle_id: Option<Uuid>,
    pub status: Option<TripStatusEnum>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    DriverId,
    VehicleId,
    Status,
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
    Drivers,
    Expenses,
    Routes,
    ShipmentLegs,
    TripStops,
    Vehicles,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::DriverId => ColumnType::Uuid.def().null(),
            Self::VehicleId => ColumnType::Uuid.def().null(),
            Self::Status => TripStatusEnum::db_type()
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
            Self::Drivers => Entity::belongs_to(super::drivers::Entity)
                .from(Column::DriverId)
                .to(super::drivers::Column::Id)
                .into(),
            Self::Expenses => Entity::has_many(super::expenses::Entity).into(),
            Self::Routes => Entity::has_many(super::routes::Entity).into(),
            Self::ShipmentLegs => Entity::has_many(super::shipment_legs::Entity).into(),
            Self::TripStops => Entity::has_many(super::trip_stops::Entity).into(),
            Self::Vehicles => Entity::belongs_to(super::vehicles::Entity)
                .from(Column::VehicleId)
                .to(super::vehicles::Column::Id)
                .into(),
        }
    }
}

impl Related<super::drivers::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Drivers.def()
    }
}

impl Related<super::expenses::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Expenses.def()
    }
}

impl Related<super::routes::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Routes.def()
    }
}

impl Related<super::shipment_legs::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::ShipmentLegs.def()
    }
}

impl Related<super::trip_stops::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::TripStops.def()
    }
}

impl Related<super::vehicles::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Vehicles.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
