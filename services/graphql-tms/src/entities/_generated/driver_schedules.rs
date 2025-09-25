use super::sea_orm_active_enums::DriverScheduleReasonEnum;
use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("tms")
    }
    fn table_name(&self) -> &str {
        "driver_schedules"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "TmsDriverSchedule")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub driver_id: Uuid,
    pub start_date: Date,
    pub end_date: Date,
    pub reason: Option<DriverScheduleReasonEnum>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    DriverId,
    StartDate,
    EndDate,
    Reason,
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
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::DriverId => ColumnType::Uuid.def(),
            Self::StartDate => ColumnType::Date.def(),
            Self::EndDate => ColumnType::Date.def(),
            Self::Reason => DriverScheduleReasonEnum::db_type()
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
        }
    }
}

impl Related<super::drivers::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Drivers.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
