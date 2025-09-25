use super::sea_orm_active_enums::ReturnStatusEnum;
use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("ims")
    }
    fn table_name(&self) -> &str {
        "returns"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "ImsReturn")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub return_number: String,
    pub sales_order_id: Option<Uuid>,
    pub client_id: Uuid,
    pub status: Option<ReturnStatusEnum>,
    pub reason: Option<String>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    ReturnNumber,
    SalesOrderId,
    ClientId,
    Status,
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
    Companies,
    ReturnItems,
    SalesOrders,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::ReturnNumber => ColumnType::String(StringLen::N(100u32)).def().unique(),
            Self::SalesOrderId => ColumnType::Uuid.def().null(),
            Self::ClientId => ColumnType::Uuid.def(),
            Self::Status => ReturnStatusEnum::db_type()
                .get_column_type()
                .to_owned()
                .def()
                .null(),
            Self::Reason => ColumnType::Text.def().null(),
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
            Self::ReturnItems => Entity::has_many(super::return_items::Entity).into(),
            Self::SalesOrders => Entity::belongs_to(super::sales_orders::Entity)
                .from(Column::SalesOrderId)
                .to(super::sales_orders::Column::Id)
                .into(),
        }
    }
}

impl Related<super::companies::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Companies.def()
    }
}

impl Related<super::return_items::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::ReturnItems.def()
    }
}

impl Related<super::sales_orders::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::SalesOrders.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
