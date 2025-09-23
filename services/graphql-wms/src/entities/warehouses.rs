use crate::entities::_generated::warehouses;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};

// --- fake imports ---
use fake::Dummy;
use fake::faker::address::raw::{CityName, CountryName, PostCode, StateName, StreetName};
use fake::faker::internet::raw::{SafeEmail, Username};
use fake::faker::lorem::raw::Word;
use fake::faker::phone_number::raw::PhoneNumber;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertWarehouse {
    #[dummy(faker = "Word(EN)")]
    pub name: String,
    #[dummy(faker = "StreetName(EN)")]
    pub address: Option<String>,
    #[dummy(faker = "CityName(EN)")]
    pub city: Option<String>,
    #[dummy(faker = "StateName(EN)")]
    pub state: Option<String>,
    #[dummy(faker = "PostCode(EN)")]
    pub postal_code: Option<String>,
    #[dummy(faker = "CountryName(EN)")]
    pub country: Option<String>,
    #[dummy(faker = "Word(EN)")]
    pub timezone: Option<String>,
    #[dummy(faker = "Username(EN)")]
    pub contact_person: Option<String>,
    #[dummy(faker = "SafeEmail(EN)")]
    pub contact_email: Option<String>,
    #[dummy(faker = "PhoneNumber(EN)")]
    pub contact_phone: Option<String>,

    pub is_active: Option<bool>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateWarehouse {
    pub name: Option<String>,
    pub address: Option<Option<String>>,
    pub city: Option<Option<String>>,
    pub state: Option<Option<String>>,
    pub postal_code: Option<Option<String>>,
    pub country: Option<Option<String>>,
    pub timezone: Option<Option<String>>,
    pub contact_person: Option<Option<String>>,
    pub contact_email: Option<Option<String>>,
    pub contact_phone: Option<Option<String>>,
    pub is_active: Option<Option<bool>>,
}

impl IntoActiveModel<warehouses::ActiveModel> for InsertWarehouse {
    fn into_active_model(self) -> warehouses::ActiveModel {
        let mut active_model = warehouses::ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.address = Set(self.address);
        active_model.city = Set(self.city);
        active_model.state = Set(self.state);
        active_model.postal_code = Set(self.postal_code);
        active_model.country = Set(self.country);
        active_model.timezone = Set(self.timezone);
        active_model.contact_person = Set(self.contact_person);
        active_model.contact_email = Set(self.contact_email);
        active_model.contact_phone = Set(self.contact_phone);
        active_model.is_active = Set(self.is_active);
        active_model
    }
}

impl IntoActiveModel<warehouses::ActiveModel> for UpdateWarehouse {
    fn into_active_model(self) -> warehouses::ActiveModel {
        let mut active_model = warehouses::ActiveModel::new();
        active_model.name = self.name.map(Set).unwrap_or(NotSet);
        active_model.address = self.address.map(Set).unwrap_or(NotSet);
        active_model.city = self.city.map(Set).unwrap_or(NotSet);
        active_model.state = self.state.map(Set).unwrap_or(NotSet);
        active_model.postal_code = self.postal_code.map(Set).unwrap_or(NotSet);
        active_model.country = self.country.map(Set).unwrap_or(NotSet);
        active_model.timezone = self.timezone.map(Set).unwrap_or(NotSet);
        active_model.contact_person = self.contact_person.map(Set).unwrap_or(NotSet);
        active_model.contact_email = self.contact_email.map(Set).unwrap_or(NotSet);
        active_model.contact_phone = self.contact_phone.map(Set).unwrap_or(NotSet);
        active_model.is_active = self.is_active.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{locations, packages, pick_batches, putaway_rules};
use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};

#[ComplexObject]
impl warehouses::Model {
    async fn locations(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<locations::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = locations::Entity::find()
            .filter(locations::Column::WarehouseId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn packages(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<packages::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = packages::Entity::find()
            .filter(packages::Column::WarehouseId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn pick_batches(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<pick_batches::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = pick_batches::Entity::find()
            .filter(pick_batches::Column::WarehouseId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn putaway_rules(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<putaway_rules::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = putaway_rules::Entity::find()
            .filter(putaway_rules::Column::WarehouseId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }
}
