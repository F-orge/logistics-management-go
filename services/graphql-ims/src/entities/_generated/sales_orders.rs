

use super::sea_orm_active_enums::SalesOrderStatusEnum;
use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("ims")
    }
    fn table_name(&self) -> &str {
        "sales_orders"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "ImsSalesOrder")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub order_number: String,
    pub client_id: Uuid,
    pub crm_opportunity_id: Option<Uuid>,
    pub status: Option<SalesOrderStatusEnum>,
    pub shipping_address: Option<String>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    OrderNumber,
    ClientId,
    CrmOpportunityId,
    Status,
    ShippingAddress,
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
    Opportunities,
    OutboundShipments,
    Returns,
    SalesOrderItems,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::OrderNumber => ColumnType::String(StringLen::N(100u32)).def().unique(),
            Self::ClientId => ColumnType::Uuid.def(),
            Self::CrmOpportunityId => ColumnType::Uuid.def().null(),
            Self::Status => SalesOrderStatusEnum::db_type()
                .get_column_type()
                .to_owned()
                .def()
                .null(),
            Self::ShippingAddress => ColumnType::Text.def().null(),
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
            Self::Opportunities => Entity::belongs_to(super::opportunities::Entity)
                .from(Column::CrmOpportunityId)
                .to(super::opportunities::Column::Id)
                .into(),
            Self::OutboundShipments => Entity::has_many(super::outbound_shipments::Entity).into(),
            Self::Returns => Entity::has_many(super::returns::Entity).into(),
            Self::SalesOrderItems => Entity::has_many(super::sales_order_items::Entity).into(),
        }
    }
}

impl Related<super::companies::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Companies.def()
    }
}

impl Related<super::opportunities::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Opportunities.def()
    }
}

impl Related<super::outbound_shipments::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::OutboundShipments.def()
    }
}

impl Related<super::returns::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Returns.def()
    }
}

impl Related<super::sales_order_items::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::SalesOrderItems.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
