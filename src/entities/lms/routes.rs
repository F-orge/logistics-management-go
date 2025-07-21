// Create/Update structs for lms_routes

use crate::entities::_generated::lms_routes::*;
use crate::entities::_generated::sea_orm_active_enums::LmsRouteStatus;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreateRoute {
    pub route_name: String,
    pub driver_id: Option<Uuid>,
    pub vehicle_id: Option<Uuid>,
    pub route_date: Date,
    pub estimated_departure: Option<DateTimeWithTimeZone>,
    pub actual_departure: Option<DateTimeWithTimeZone>,
    pub estimated_arrival: Option<DateTimeWithTimeZone>,
    pub actual_arrival: Option<DateTimeWithTimeZone>,
    pub status: LmsRouteStatus,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateRoute {
    pub id: Uuid,
    pub route_name: Option<String>,
    pub driver_id: Option<Option<Uuid>>,
    pub vehicle_id: Option<Option<Uuid>>,
    pub route_date: Option<Date>,
    pub estimated_departure: Option<Option<DateTimeWithTimeZone>>,
    pub actual_departure: Option<Option<DateTimeWithTimeZone>>,
    pub estimated_arrival: Option<Option<DateTimeWithTimeZone>>,
    pub actual_arrival: Option<Option<DateTimeWithTimeZone>>,
    pub status: Option<LmsRouteStatus>,
}

impl IntoActiveModel<ActiveModel> for CreateRoute {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.route_name = Set(self.route_name);
        active_model.driver_id = Set(self.driver_id);
        active_model.vehicle_id = Set(self.vehicle_id);
        active_model.route_date = Set(self.route_date);
        active_model.estimated_departure = Set(self.estimated_departure);
        active_model.actual_departure = Set(self.actual_departure);
        active_model.estimated_arrival = Set(self.estimated_arrival);
        active_model.actual_arrival = Set(self.actual_arrival);
        active_model.status = Set(self.status);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateRoute {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(route_name) = self.route_name {
            active_model.route_name = Set(route_name);
        }
        if let Some(driver_id) = self.driver_id {
            active_model.driver_id = Set(driver_id);
        }
        if let Some(vehicle_id) = self.vehicle_id {
            active_model.vehicle_id = Set(vehicle_id);
        }
        if let Some(route_date) = self.route_date {
            active_model.route_date = Set(route_date);
        }
        if let Some(estimated_departure) = self.estimated_departure {
            active_model.estimated_departure = Set(estimated_departure);
        }
        if let Some(actual_departure) = self.actual_departure {
            active_model.actual_departure = Set(actual_departure);
        }
        if let Some(estimated_arrival) = self.estimated_arrival {
            active_model.estimated_arrival = Set(estimated_arrival);
        }
        if let Some(actual_arrival) = self.actual_arrival {
            active_model.actual_arrival = Set(actual_arrival);
        }
        if let Some(status) = self.status {
            active_model.status = Set(status);
        }
        active_model
    }
}
