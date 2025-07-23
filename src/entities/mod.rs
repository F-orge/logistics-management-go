use _generated::auth_users::Column as AuthUserColumn;
use _generated::crm_campaign_contacts::Column as CrmCampaignContactsColumn;
use _generated::crm_campaigns::Column as CrmCampaignsColumn;
use _generated::crm_cases::Column as CrmCasesColumn;
use _generated::crm_companies::Column as CrmCompaniesColumn;
use _generated::crm_contacts::Column as CrmContactsColumn;
use _generated::crm_interactions::Column as CrmInteractionsColumn;
use _generated::crm_invoice_line_items::Column as CrmInvoiceLineItemsColumn;
use _generated::crm_invoices::Column as CrmInvoicesColumn;
use _generated::crm_leads::Column as CrmLeadsColumn;
use _generated::crm_notifications::Column as CrmNotificationsColumn;
use _generated::crm_opportunities::Column as CrmOpportunitiesColumn;
use _generated::crm_opportunity_products::Column as CrmOpportunityProductsColumn;
use _generated::crm_products::Column as CrmProductsColumn;
use _generated::lms_addresses::Column as LmsAddressesColumn;
use _generated::lms_packages::Column as LmsPackagesColumn;
use _generated::lms_pricing_rates::Column as LmsPricingRatesColumn;
use _generated::lms_pricing_zone_countries::Column as LmsPricingZoneCountriesColumn;
use _generated::lms_pricing_zones::Column as LmsPricingZonesColumn;
use _generated::lms_provider_invoice_line_items::Column as LmsProviderInvoiceLineItemsColumn;
use _generated::lms_provider_invoices::Column as LmsProviderInvoicesColumn;
use _generated::lms_provider_performance::Column as LmsProviderPerformanceColumn;
use _generated::lms_provider_rates::Column as LmsProviderRatesColumn;
use _generated::lms_provider_service_destination_countries::Column as LmsProviderServiceDestinationCountriesColumn;
use _generated::lms_provider_service_max_dimensions::Column as LmsProviderServiceMaxDimensionsColumn;
use _generated::lms_provider_service_origin_countries::Column as LmsProviderServiceOriginCountriesColumn;
use _generated::lms_provider_services::Column as LmsProviderServicesColumn;
use _generated::lms_route_shipments::Column as LmsRouteShipmentsColumn;
use _generated::lms_routes::Column as LmsRoutesColumn;
use _generated::lms_shipments::Column as LmsShipmentsColumn;
use _generated::lms_shipping_service_max_dimensions::Column as LmsShippingServiceMaxDimensionsColumn;
use _generated::lms_shipping_services::Column as LmsShippingServicesColumn;
use _generated::lms_tracking_events::Column as LmsTrackingEventsColumn;
use _generated::lms_transport_legs::Column as LmsTransportLegsColumn;
use _generated::lms_transportation_providers::Column as LmsTransportationProvidersColumn;
use _generated::lms_warehouse_inventories::Column as LmsWarehouseInventoriesColumn;
use _generated::lms_warehouses::Column as LmsWarehousesColumn;
use _generated::org_department_permissions::Column as OrgDepartmentPermissionsColumn;
use _generated::org_department_transport_modes::Column as OrgDepartmentTransportModesColumn;
use _generated::org_department_user_permissions::Column as OrgDepartmentUserPermissionsColumn;
use _generated::org_department_users::Column as OrgDepartmentUsersColumn;
use _generated::org_departments::Column as OrgDepartmentsColumn;
use _generated::org_drivers::Column as OrgDriversColumn;
use _generated::org_vehicles::Column as OrgVehiclesColumn;
use async_graphql::{InputObject, InputType};
use sea_orm::sea_query::{IntoColumnRef, SimpleExpr};

pub mod _generated;
pub mod auth;
pub mod crm;
pub mod lms;
pub mod org;

#[derive(Debug, Clone, Copy, PartialEq, Eq, async_graphql::Enum)]
pub enum SortOrder {
    Asc,
    Desc,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, async_graphql::Enum)]
pub enum FilterOperator {
    Equals,
    Contains,
    StartsWith,
    EndsWith,
}

#[derive(Debug, Clone, InputObject)]
#[graphql(
    concrete(name = "AuthUserSort", params(AuthUserColumn)),
    concrete(name = "CrmInvoiceLineItemsSort", params(CrmInvoiceLineItemsColumn)),
    concrete(name = "CrmCompaniesSort", params(CrmCompaniesColumn)),
    concrete(name = "CrmLeadsSort", params(CrmLeadsColumn)),
    concrete(name = "LmsPackagesSort", params(LmsPackagesColumn)),
    concrete(name = "LmsAddressesSort", params(LmsAddressesColumn)),
    concrete(name = "LmsTrackingEventsSort", params(LmsTrackingEventsColumn)),
    concrete(
        name = "LmsShippingServiceMaxDimensionsSort",
        params(LmsShippingServiceMaxDimensionsColumn)
    ),
    concrete(
        name = "LmsProviderPerformanceSort",
        params(LmsProviderPerformanceColumn)
    ),
    concrete(
        name = "LmsWarehouseInventoriesSort",
        params(LmsWarehouseInventoriesColumn)
    ),
    concrete(name = "LmsProviderRatesSort", params(LmsProviderRatesColumn)),
    concrete(name = "LmsProviderServicesSort", params(LmsProviderServicesColumn)),
    concrete(
        name = "OrgDepartmentUserPermissionsSort",
        params(OrgDepartmentUserPermissionsColumn)
    ),
    concrete(name = "OrgDepartmentsSort", params(OrgDepartmentsColumn)),
    concrete(name = "CrmCampaignsSort", params(CrmCampaignsColumn)),
    concrete(name = "CrmNotificationsSort", params(CrmNotificationsColumn)),
    concrete(name = "CrmCasesSort", params(CrmCasesColumn)),
    concrete(name = "LmsWarehousesSort", params(LmsWarehousesColumn)),
    concrete(name = "LmsShipmentsSort", params(LmsShipmentsColumn)),
    concrete(name = "CrmOpportunitiesSort", params(CrmOpportunitiesColumn)),
    concrete(
        name = "LmsProviderServiceDestinationCountriesSort",
        params(LmsProviderServiceDestinationCountriesColumn)
    ),
    concrete(name = "OrgDriversSort", params(OrgDriversColumn)),
    concrete(
        name = "CrmOpportunityProductsSort",
        params(CrmOpportunityProductsColumn)
    ),
    concrete(name = "OrgVehiclesSort", params(OrgVehiclesColumn)),
    concrete(name = "LmsRouteShipmentsSort", params(LmsRouteShipmentsColumn)),
    concrete(name = "LmsProviderInvoicesSort", params(LmsProviderInvoicesColumn)),
    concrete(
        name = "OrgDepartmentPermissionsSort",
        params(OrgDepartmentPermissionsColumn)
    ),
    concrete(name = "CrmCampaignContactsSort", params(CrmCampaignContactsColumn)),
    concrete(name = "LmsRoutesSort", params(LmsRoutesColumn)),
    concrete(name = "LmsPricingZonesSort", params(LmsPricingZonesColumn)),
    concrete(name = "CrmInvoicesSort", params(CrmInvoicesColumn)),
    concrete(
        name = "LmsProviderServiceOriginCountriesSort",
        params(LmsProviderServiceOriginCountriesColumn)
    ),
    concrete(name = "LmsShippingServicesSort", params(LmsShippingServicesColumn)),
    concrete(name = "CrmProductsSort", params(CrmProductsColumn)),
    concrete(
        name = "LmsProviderInvoiceLineItemsSort",
        params(LmsProviderInvoiceLineItemsColumn)
    ),
    concrete(
        name = "LmsPricingZoneCountriesSort",
        params(LmsPricingZoneCountriesColumn)
    ),
    concrete(name = "CrmInteractionsSort", params(CrmInteractionsColumn)),
    concrete(name = "LmsPricingRatesSort", params(LmsPricingRatesColumn)),
    concrete(name = "CrmContactsSort", params(CrmContactsColumn)),
    concrete(
        name = "OrgDepartmentTransportModesSort",
        params(OrgDepartmentTransportModesColumn)
    ),
    concrete(
        name = "LmsTransportationProvidersSort",
        params(LmsTransportationProvidersColumn)
    ),
    concrete(name = "OrgDepartmentUsersSort", params(OrgDepartmentUsersColumn)),
    concrete(
        name = "LmsProviderServiceMaxDimensionsSort",
        params(LmsProviderServiceMaxDimensionsColumn)
    ),
    concrete(name = "LmsTransportLegsSort", params(LmsTransportLegsColumn))
)]
pub struct SortGeneric<T: InputType + IntoColumnRef + Clone> {
    pub column: T,
    pub order: SortOrder,
}

impl<T> SortGeneric<T>
where
    T: InputType + IntoColumnRef + Clone,
{
    pub fn sort(&self) -> (T, sea_orm::sea_query::Order) {
        match self.order {
            SortOrder::Asc => (self.column.clone(), sea_orm::sea_query::Order::Asc),
            SortOrder::Desc => (self.column.clone(), sea_orm::sea_query::Order::Desc),
        }
    }
}

#[derive(Debug, Clone, InputObject)]
#[graphql(
    concrete(name = "AuthUserFilter", params(AuthUserColumn)),
    concrete(name = "CrmInvoiceLineItemsFilter", params(CrmInvoiceLineItemsColumn)),
    concrete(name = "CrmCompaniesFilter", params(CrmCompaniesColumn)),
    concrete(name = "CrmLeadsFilter", params(CrmLeadsColumn)),
    concrete(name = "LmsPackagesFilter", params(LmsPackagesColumn)),
    concrete(name = "LmsAddressesFilter", params(LmsAddressesColumn)),
    concrete(name = "LmsTrackingEventsFilter", params(LmsTrackingEventsColumn)),
    concrete(
        name = "LmsShippingServiceMaxDimensionsFilter",
        params(LmsShippingServiceMaxDimensionsColumn)
    ),
    concrete(
        name = "LmsProviderPerformanceFilter",
        params(LmsProviderPerformanceColumn)
    ),
    concrete(
        name = "LmsWarehouseInventoriesFilter",
        params(LmsWarehouseInventoriesColumn)
    ),
    concrete(name = "LmsProviderRatesFilter", params(LmsProviderRatesColumn)),
    concrete(name = "LmsProviderServicesFilter", params(LmsProviderServicesColumn)),
    concrete(
        name = "OrgDepartmentUserPermissionsFilter",
        params(OrgDepartmentUserPermissionsColumn)
    ),
    concrete(name = "OrgDepartmentsFilter", params(OrgDepartmentsColumn)),
    concrete(name = "CrmCampaignsFilter", params(CrmCampaignsColumn)),
    concrete(name = "CrmNotificationsFilter", params(CrmNotificationsColumn)),
    concrete(name = "CrmCasesFilter", params(CrmCasesColumn)),
    concrete(name = "LmsWarehousesFilter", params(LmsWarehousesColumn)),
    concrete(name = "LmsShipmentsFilter", params(LmsShipmentsColumn)),
    concrete(name = "CrmOpportunitiesFilter", params(CrmOpportunitiesColumn)),
    concrete(
        name = "LmsProviderServiceDestinationCountriesFilter",
        params(LmsProviderServiceDestinationCountriesColumn)
    ),
    concrete(name = "OrgDriversFilter", params(OrgDriversColumn)),
    concrete(
        name = "CrmOpportunityProductsFilter",
        params(CrmOpportunityProductsColumn)
    ),
    concrete(name = "OrgVehiclesFilter", params(OrgVehiclesColumn)),
    concrete(name = "LmsRouteShipmentsFilter", params(LmsRouteShipmentsColumn)),
    concrete(name = "LmsProviderInvoicesFilter", params(LmsProviderInvoicesColumn)),
    concrete(
        name = "OrgDepartmentPermissionsFilter",
        params(OrgDepartmentPermissionsColumn)
    ),
    concrete(name = "CrmCampaignContactsFilter", params(CrmCampaignContactsColumn)),
    concrete(name = "LmsRoutesFilter", params(LmsRoutesColumn)),
    concrete(name = "LmsPricingZonesFilter", params(LmsPricingZonesColumn)),
    concrete(name = "CrmInvoicesFilter", params(CrmInvoicesColumn)),
    concrete(
        name = "LmsProviderServiceOriginCountriesFilter",
        params(LmsProviderServiceOriginCountriesColumn)
    ),
    concrete(name = "LmsShippingServicesFilter", params(LmsShippingServicesColumn)),
    concrete(name = "CrmProductsFilter", params(CrmProductsColumn)),
    concrete(
        name = "LmsProviderInvoiceLineItemsFilter",
        params(LmsProviderInvoiceLineItemsColumn)
    ),
    concrete(
        name = "LmsPricingZoneCountriesFilter",
        params(LmsPricingZoneCountriesColumn)
    ),
    concrete(name = "CrmInteractionsFilter", params(CrmInteractionsColumn)),
    concrete(name = "LmsPricingRatesFilter", params(LmsPricingRatesColumn)),
    concrete(name = "CrmContactsFilter", params(CrmContactsColumn)),
    concrete(
        name = "OrgDepartmentTransportModesFilter",
        params(OrgDepartmentTransportModesColumn)
    ),
    concrete(
        name = "LmsTransportationProvidersFilter",
        params(LmsTransportationProvidersColumn)
    ),
    concrete(name = "OrgDepartmentUsersFilter", params(OrgDepartmentUsersColumn)),
    concrete(
        name = "LmsProviderServiceMaxDimensionsFilter",
        params(LmsProviderServiceMaxDimensionsColumn)
    ),
    concrete(name = "LmsTransportLegsFilter", params(LmsTransportLegsColumn))
)]
pub struct FilterGeneric<T: InputType + IntoColumnRef + Clone> {
    pub column: T,
    pub operator: FilterOperator,
    pub value: String,
}

impl<T> FilterGeneric<T>
where
    T: InputType + IntoColumnRef + Clone,
{
    pub fn filter(&self) -> SimpleExpr {
        match self.operator {
            FilterOperator::Equals => {
                sea_orm::sea_query::Expr::col(self.column.clone()).eq(self.value.clone())
            }
            FilterOperator::Contains => {
                sea_orm::sea_query::Expr::col(self.column.clone()).like(format!("%{}%", self.value))
            }
            FilterOperator::StartsWith => {
                sea_orm::sea_query::Expr::col(self.column.clone()).like(format!("{}%", self.value))
            }
            FilterOperator::EndsWith => {
                sea_orm::sea_query::Expr::col(self.column.clone()).like(format!("%{}", self.value))
            }
        }
    }
}
