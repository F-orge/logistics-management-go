use async_graphql::{Object, SimpleObject};
mod addresses;
mod packages;
mod pricing_rates;
mod pricing_zone_countries;
mod pricing_zones;
mod provider_invoice_line_items;
mod provider_invoices;
mod provider_performance;
mod provider_rates;
mod provider_service_destination_countries;
mod provider_service_max_dimensions;
mod provider_service_origin_countries;
mod provider_services;
mod route_shipments;
mod routes;
mod shipments;
mod shipping_service_max_dimensions;
mod shipping_services;
mod tracking_events;
mod transport_legs;
mod transportation_providers;
mod warehouse_inventories;
mod warehouses;

#[derive(SimpleObject)]
pub struct LmsQuery {
    addresses: addresses::AddressesQuery,
    packages: packages::PackagesQuery,
    pricing_rates: pricing_rates::PricingRatesQuery,
    pricing_zones: pricing_zones::PricingZonesQuery,
    provider_invoices: provider_invoices::ProviderInvoicesQuery,
    provider_performance: provider_performance::ProviderPerformancesQuery,
    provider_rates: provider_rates::ProviderRatesQuery,
    provider_service_destination_countries:
        provider_service_destination_countries::ProviderServiceDestinationCountriesQuery,
    provider_service_max_dimensions:
        provider_service_max_dimensions::ProviderServiceMaxDimensionsQuery,
    provider_service_origin_countries:
        provider_service_origin_countries::ProviderServiceOriginCountriesQuery,
    provider_services: provider_services::ProviderServicesQuery,
    routes: routes::RoutesQuery,
    shipments: shipments::ShipmentsQuery,
    shipping_service_max_dimensions:
        shipping_service_max_dimensions::ShippingServiceMaxDimensionsQuery,
    tracking_events: tracking_events::TrackingEventsQuery,
    transport_legs: transport_legs::TransportLegsQuery,
    transportation_providers: transportation_providers::TransportationProvidersQuery,
    warehouses: warehouses::WarehousesQuery,
}

#[derive(Default, SimpleObject)]
pub struct LmsMutation {
    addresses: addresses::AddressesMutation,
    packages: packages::PackagesMutation,
    pricing_rates: pricing_rates::PricingRatesMutation,
    pricing_zone_countries: pricing_zone_countries::PricingZoneCountriesMutation,
    pricing_zones: pricing_zones::PricingZonesMutation,
    provider_invoice_line_items: provider_invoice_line_items::ProviderInvoiceLineItemsMutation,
    provider_invoices: provider_invoices::ProviderInvoicesMutation,
    provider_performance: provider_performance::ProviderPerformancesMutation,
    provider_rates: provider_rates::ProviderRatesMutation,
    provider_service_destination_countries:
        provider_service_destination_countries::ProviderServiceDestinationCountriesMutation,
    provider_service_max_dimensions:
        provider_service_max_dimensions::ProviderServiceMaxDimensionsMutation,
    provider_service_origin_countries:
        provider_service_origin_countries::ProviderServiceOriginCountriesMutation,
    provider_services: provider_services::ProviderServicesMutation,
    route_shipments: route_shipments::RouteShipmentsMutation,
    routes: routes::RoutesMutation,
    shipments: shipments::ShipmentsMutation,
    shipping_service_max_dimensions:
        shipping_service_max_dimensions::ShippingServiceMaxDimensionsMutation,
    shipping_services: shipping_services::ShippingServicesMutation,
    tracking_events: tracking_events::TrackingEventsMutation,
    transport_legs: transport_legs::TransportLegsMutation,
    transportation_providers: transportation_providers::TransportationProvidersMutation,
    warehouse_inventories: warehouse_inventories::WarehouseInventoriesMutation,
    warehouses: warehouses::WarehousesMutation,
}
