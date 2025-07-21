// Create/Update structs for lms_transportation_providers

use crate::entities::_generated::lms_transportation_providers::*;
use crate::entities::_generated::sea_orm_active_enums::LmsProviderType;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreateTransportationProvider {
    pub company_name: String,
    pub provider_type: LmsProviderType,
    pub contact_person: Option<String>,
    pub email: Option<String>,
    pub phone_number: Option<String>,
    pub address_id: Option<Uuid>,
    pub preferred_by_department_id: Option<Uuid>,
    pub api_endpoint: Option<String>,
    pub api_key: Option<String>,
    pub contract_start_date: Option<Date>,
    pub contract_end_date: Option<Date>,
    pub payment_terms: Option<String>,
    pub insurance_coverage: Option<Decimal>,
    pub performance_rating: Option<Decimal>,
    pub is_active: bool,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateTransportationProvider {
    pub id: Uuid,
    pub company_name: Option<String>,
    pub provider_type: Option<LmsProviderType>,
    pub contact_person: Option<Option<String>>,
    pub email: Option<Option<String>>,
    pub phone_number: Option<Option<String>>,
    pub address_id: Option<Option<Uuid>>,
    pub preferred_by_department_id: Option<Option<Uuid>>,
    pub api_endpoint: Option<Option<String>>,
    pub api_key: Option<Option<String>>,
    pub contract_start_date: Option<Option<Date>>,
    pub contract_end_date: Option<Option<Date>>,
    pub payment_terms: Option<Option<String>>,
    pub insurance_coverage: Option<Option<Decimal>>,
    pub performance_rating: Option<Option<Decimal>>,
    pub is_active: Option<bool>,
}

impl IntoActiveModel<ActiveModel> for CreateTransportationProvider {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.company_name = Set(self.company_name);
        active_model.provider_type = Set(self.provider_type);
        active_model.contact_person = Set(self.contact_person);
        active_model.email = Set(self.email);
        active_model.phone_number = Set(self.phone_number);
        active_model.address_id = Set(self.address_id);
        active_model.preferred_by_department_id = Set(self.preferred_by_department_id);
        active_model.api_endpoint = Set(self.api_endpoint);
        active_model.api_key = Set(self.api_key);
        active_model.contract_start_date = Set(self.contract_start_date);
        active_model.contract_end_date = Set(self.contract_end_date);
        active_model.payment_terms = Set(self.payment_terms);
        active_model.insurance_coverage = Set(self.insurance_coverage);
        active_model.performance_rating = Set(self.performance_rating);
        active_model.is_active = Set(self.is_active);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateTransportationProvider {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(company_name) = self.company_name {
            active_model.company_name = Set(company_name);
        }
        if let Some(provider_type) = self.provider_type {
            active_model.provider_type = Set(provider_type);
        }
        if let Some(contact_person) = self.contact_person {
            active_model.contact_person = Set(contact_person);
        }
        if let Some(email) = self.email {
            active_model.email = Set(email);
        }
        if let Some(phone_number) = self.phone_number {
            active_model.phone_number = Set(phone_number);
        }
        if let Some(address_id) = self.address_id {
            active_model.address_id = Set(address_id);
        }
        if let Some(preferred_by_department_id) = self.preferred_by_department_id {
            active_model.preferred_by_department_id = Set(preferred_by_department_id);
        }
        if let Some(api_endpoint) = self.api_endpoint {
            active_model.api_endpoint = Set(api_endpoint);
        }
        if let Some(api_key) = self.api_key {
            active_model.api_key = Set(api_key);
        }
        if let Some(contract_start_date) = self.contract_start_date {
            active_model.contract_start_date = Set(contract_start_date);
        }
        if let Some(contract_end_date) = self.contract_end_date {
            active_model.contract_end_date = Set(contract_end_date);
        }
        if let Some(payment_terms) = self.payment_terms {
            active_model.payment_terms = Set(payment_terms);
        }
        if let Some(insurance_coverage) = self.insurance_coverage {
            active_model.insurance_coverage = Set(insurance_coverage);
        }
        if let Some(performance_rating) = self.performance_rating {
            active_model.performance_rating = Set(performance_rating);
        }
        if let Some(is_active) = self.is_active {
            active_model.is_active = Set(is_active);
        }
        active_model
    }
}
