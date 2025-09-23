use crate::entities::_generated::{drivers, sea_orm_active_enums::DriverStatusEnum};
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
use fake::faker::number::raw::NumberWithFormat;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertDriver {
    pub user_id: Uuid,
    #[dummy(faker = "NumberWithFormat(EN, \"LIC-######\")")]
    pub license_number: String,

    pub license_expiry_date: Option<Date>,

    pub status: Option<DriverStatusEnum>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateDriver {
    pub user_id: Option<Uuid>,
    pub license_number: Option<String>,
    pub license_expiry_date: Option<Option<Date>>,
    pub status: Option<Option<DriverStatusEnum>>,
}

impl IntoActiveModel<drivers::ActiveModel> for InsertDriver {
    fn into_active_model(self) -> drivers::ActiveModel {
        let mut active_model = drivers::ActiveModel::new();
        active_model.user_id = Set(self.user_id);
        active_model.license_number = Set(self.license_number);
        active_model.license_expiry_date = Set(self.license_expiry_date);
        active_model.status = Set(self.status);
        active_model
    }
}

impl IntoActiveModel<drivers::ActiveModel> for UpdateDriver {
    fn into_active_model(self) -> drivers::ActiveModel {
        let mut active_model = drivers::ActiveModel::new();
        active_model.user_id = self.user_id.map(Set).unwrap_or(NotSet);
        active_model.license_number = self.license_number.map(Set).unwrap_or(NotSet);
        active_model.license_expiry_date = self.license_expiry_date.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::user;
use crate::entities::_generated::{driver_schedules, expenses, trips};
use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};

#[ComplexObject]
impl drivers::Model {
    async fn user(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = user::Entity::find_by_id(self.user_id).one(db).await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("User not found")),
        }
    }

    async fn driver_schedules(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<driver_schedules::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = driver_schedules::Entity::find()
            .filter(driver_schedules::Column::DriverId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn expenses(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<expenses::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = expenses::Entity::find()
            .filter(expenses::Column::DriverId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn trips(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<trips::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = trips::Entity::find()
            .filter(trips::Column::DriverId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }
}
