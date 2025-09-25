

use super::sea_orm_active_enums::DeliveryFailureReasonEnum;
use super::sea_orm_active_enums::DeliveryTaskStatusEnum;
use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("dms")
    }
    fn table_name(&self) -> &str {
        "delivery_tasks"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "DmsDeliveryTask")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub package_id: Uuid,
    pub delivery_route_id: Uuid,
    pub route_sequence: i32,
    pub delivery_address: String,
    pub recipient_name: Option<String>,
    pub recipient_phone: Option<String>,
    pub delivery_instructions: Option<String>,
    pub estimated_arrival_time: Option<DateTime>,
    pub actual_arrival_time: Option<DateTime>,
    pub delivery_time: Option<DateTime>,
    pub status: Option<DeliveryTaskStatusEnum>,
    pub failure_reason: Option<DeliveryFailureReasonEnum>,
    pub attempt_count: Option<i32>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    PackageId,
    DeliveryRouteId,
    RouteSequence,
    DeliveryAddress,
    RecipientName,
    RecipientPhone,
    DeliveryInstructions,
    EstimatedArrivalTime,
    ActualArrivalTime,
    DeliveryTime,
    Status,
    FailureReason,
    AttemptCount,
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
    CustomerTrackingLinks,
    DeliveryRoutes,
    Packages,
    ProofOfDeliveries,
    TaskEvents,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::PackageId => ColumnType::Uuid.def(),
            Self::DeliveryRouteId => ColumnType::Uuid.def(),
            Self::RouteSequence => ColumnType::Integer.def(),
            Self::DeliveryAddress => ColumnType::Text.def(),
            Self::RecipientName => ColumnType::String(StringLen::N(255u32)).def().null(),
            Self::RecipientPhone => ColumnType::String(StringLen::N(20u32)).def().null(),
            Self::DeliveryInstructions => ColumnType::Text.def().null(),
            Self::EstimatedArrivalTime => ColumnType::DateTime.def().null(),
            Self::ActualArrivalTime => ColumnType::DateTime.def().null(),
            Self::DeliveryTime => ColumnType::DateTime.def().null(),
            Self::Status => DeliveryTaskStatusEnum::db_type()
                .get_column_type()
                .to_owned()
                .def()
                .null(),
            Self::FailureReason => DeliveryFailureReasonEnum::db_type()
                .get_column_type()
                .to_owned()
                .def()
                .null(),
            Self::AttemptCount => ColumnType::Integer.def().null(),
            Self::CreatedAt => ColumnType::DateTime.def().null(),
            Self::UpdatedAt => ColumnType::DateTime.def().null(),
        }
    }
}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        match self {
            Self::CustomerTrackingLinks => {
                Entity::has_many(super::customer_tracking_links::Entity).into()
            }
            Self::DeliveryRoutes => Entity::belongs_to(super::delivery_routes::Entity)
                .from(Column::DeliveryRouteId)
                .to(super::delivery_routes::Column::Id)
                .into(),
            Self::Packages => Entity::belongs_to(super::packages::Entity)
                .from(Column::PackageId)
                .to(super::packages::Column::Id)
                .into(),
            Self::ProofOfDeliveries => Entity::has_many(super::proof_of_deliveries::Entity).into(),
            Self::TaskEvents => Entity::has_many(super::task_events::Entity).into(),
        }
    }
}

impl Related<super::customer_tracking_links::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::CustomerTrackingLinks.def()
    }
}

impl Related<super::delivery_routes::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::DeliveryRoutes.def()
    }
}

impl Related<super::packages::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Packages.def()
    }
}

impl Related<super::proof_of_deliveries::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::ProofOfDeliveries.def()
    }
}

impl Related<super::task_events::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::TaskEvents.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
