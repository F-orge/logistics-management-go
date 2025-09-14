use crate::entities::_generated::warehouses;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};

#[derive(Debug, Clone, InputObject)]
pub struct InsertWarehouse {
    pub name: String,
    pub address: Option<String>,
    pub city: Option<String>,
    pub state: Option<String>,
    pub postal_code: Option<String>,
    pub country: Option<String>,
    pub timezone: Option<String>,
    pub contact_person: Option<String>,
    pub contact_email: Option<String>,
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
