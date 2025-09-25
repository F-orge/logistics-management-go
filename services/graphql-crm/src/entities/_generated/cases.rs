use super::sea_orm_active_enums::CasePriority;
use super::sea_orm_active_enums::CaseStatus;
use super::sea_orm_active_enums::CaseType;
use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("crm")
    }
    fn table_name(&self) -> &str {
        "cases"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "CrmCase")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub case_number: String,
    pub status: Option<CaseStatus>,
    pub priority: Option<CasePriority>,
    pub r#type: Option<CaseType>,
    pub owner_id: Uuid,
    pub contact_id: Option<Uuid>,
    pub description: Option<String>,
    pub created_at: Option<DateTimeWithTimeZone>,
    pub updated_at: Option<DateTimeWithTimeZone>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    CaseNumber,
    Status,
    Priority,
    Type,
    OwnerId,
    ContactId,
    Description,
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
    Contacts,
    Interactions,
    User,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::CaseNumber => ColumnType::String(StringLen::N(50u32)).def().unique(),
            Self::Status => CaseStatus::db_type()
                .get_column_type()
                .to_owned()
                .def()
                .null(),
            Self::Priority => CasePriority::db_type()
                .get_column_type()
                .to_owned()
                .def()
                .null(),
            Self::Type => CaseType::db_type()
                .get_column_type()
                .to_owned()
                .def()
                .null(),
            Self::OwnerId => ColumnType::Uuid.def(),
            Self::ContactId => ColumnType::Uuid.def().null(),
            Self::Description => ColumnType::Text.def().null(),
            Self::CreatedAt => ColumnType::TimestampWithTimeZone.def().null(),
            Self::UpdatedAt => ColumnType::TimestampWithTimeZone.def().null(),
        }
    }
}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        match self {
            Self::Contacts => Entity::belongs_to(super::contacts::Entity)
                .from(Column::ContactId)
                .to(super::contacts::Column::Id)
                .into(),
            Self::Interactions => Entity::has_many(super::interactions::Entity).into(),
            Self::User => Entity::belongs_to(super::user::Entity)
                .from(Column::OwnerId)
                .to(super::user::Column::Id)
                .into(),
        }
    }
}

impl Related<super::contacts::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Contacts.def()
    }
}

impl Related<super::interactions::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Interactions.def()
    }
}

impl Related<super::user::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::User.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
