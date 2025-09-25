

use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("auth")
    }
    fn table_name(&self) -> &str {
        "session"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "AuthSession")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub expires_at: DateTime,
    pub token: String,
    pub created_at: DateTime,
    pub updated_at: DateTime,
    pub ip_address: Option<String>,
    pub user_agent: Option<String>,
    pub user_id: Uuid,
    pub impersonated_by: Option<Uuid>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    ExpiresAt,
    Token,
    CreatedAt,
    UpdatedAt,
    IpAddress,
    UserAgent,
    UserId,
    ImpersonatedBy,
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
    User2,
    User1,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::ExpiresAt => ColumnType::DateTime.def(),
            Self::Token => ColumnType::Text.def().unique(),
            Self::CreatedAt => ColumnType::DateTime.def(),
            Self::UpdatedAt => ColumnType::DateTime.def(),
            Self::IpAddress => ColumnType::Text.def().null(),
            Self::UserAgent => ColumnType::Text.def().null(),
            Self::UserId => ColumnType::Uuid.def(),
            Self::ImpersonatedBy => ColumnType::Uuid.def().null(),
        }
    }
}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        match self {
            Self::User2 => Entity::belongs_to(super::user::Entity)
                .from(Column::ImpersonatedBy)
                .to(super::user::Column::Id)
                .into(),
            Self::User1 => Entity::belongs_to(super::user::Entity)
                .from(Column::UserId)
                .to(super::user::Column::Id)
                .into(),
        }
    }
}

impl ActiveModelBehavior for ActiveModel {}
