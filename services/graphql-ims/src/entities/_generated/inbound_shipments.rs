use super::sea_orm_active_enums::InboundShipmentStatusEnum;
use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("ims")
    }
    fn table_name(&self) -> &str {
        "inbound_shipments"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "ImsInboundShipment")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub client_id: Option<Uuid>,
    pub warehouse_id: Uuid,
    pub status: Option<InboundShipmentStatusEnum>,
    pub expected_arrival_date: Option<Date>,
    pub actual_arrival_date: Option<Date>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    ClientId,
    WarehouseId,
    Status,
    ExpectedArrivalDate,
    ActualArrivalDate,
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
    Companies,
    InboundShipmentItems,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::ClientId => ColumnType::Uuid.def().null(),
            Self::WarehouseId => ColumnType::Uuid.def(),
            Self::Status => InboundShipmentStatusEnum::db_type()
                .get_column_type()
                .to_owned()
                .def()
                .null(),
            Self::ExpectedArrivalDate => ColumnType::Date.def().null(),
            Self::ActualArrivalDate => ColumnType::Date.def().null(),
            Self::CreatedAt => ColumnType::DateTime.def().null(),
            Self::UpdatedAt => ColumnType::DateTime.def().null(),
        }
    }
}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        match self {
            Self::Companies => Entity::belongs_to(super::companies::Entity)
                .from(Column::ClientId)
                .to(super::companies::Column::Id)
                .into(),
            Self::InboundShipmentItems => {
                Entity::has_many(super::inbound_shipment_items::Entity).into()
            }
        }
    }
}

impl Related<super::companies::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Companies.def()
    }
}

impl Related<super::inbound_shipment_items::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::InboundShipmentItems.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
