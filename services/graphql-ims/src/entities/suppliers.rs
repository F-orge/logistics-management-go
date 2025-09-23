use crate::entities::_generated::suppliers;
use async_graphql::InputObject;
use chrono::{DateTime, Utc};
// --- fake imports ---
use fake::Dummy;
use fake::faker::company::raw::CompanyName;
use fake::faker::internet::raw::SafeEmail;
use fake::faker::name::raw::Name;
use fake::faker::phone_number::raw::PhoneNumber;
use fake::locales::EN;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertSupplier {
    #[dummy(faker = "CompanyName(EN)")]
    pub name: String,
    #[dummy(faker = "Name(EN)")]
    pub contact_person: Option<String>,
    #[dummy(faker = "SafeEmail(EN)")]
    pub email: Option<String>,
    #[dummy(faker = "PhoneNumber(EN)")]
    pub phone_number: Option<String>,

    pub created_at: Option<DateTime<Utc>>,

    pub updated_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateSupplier {
    pub name: Option<String>,
    pub contact_person: Option<Option<String>>,
    pub email: Option<Option<String>>,
    pub phone_number: Option<Option<String>>,
    pub created_at: Option<Option<DateTime<Utc>>>,
    pub updated_at: Option<Option<DateTime<Utc>>>,
}

impl IntoActiveModel<suppliers::ActiveModel> for InsertSupplier {
    fn into_active_model(self) -> suppliers::ActiveModel {
        let mut active_model = suppliers::ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.contact_person = Set(self.contact_person);
        active_model.email = Set(self.email);
        active_model.phone_number = Set(self.phone_number);
        active_model
    }
}

impl IntoActiveModel<suppliers::ActiveModel> for UpdateSupplier {
    fn into_active_model(self) -> suppliers::ActiveModel {
        let mut active_model = suppliers::ActiveModel::new();
        active_model.name = self.name.map(Set).unwrap_or(NotSet);
        active_model.contact_person = self.contact_person.map(Set).unwrap_or(NotSet);
        active_model.email = self.email.map(Set).unwrap_or(NotSet);
        active_model.phone_number = self.phone_number.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::products;
use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};

#[ComplexObject]
impl suppliers::Model {
    async fn products(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<products::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let results = products::Entity::find()
            .filter(products::Column::SupplierId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();

        Ok(results)
    }
}
