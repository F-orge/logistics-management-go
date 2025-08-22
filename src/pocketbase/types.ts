/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export enum Collections {
  Authorigins = '_authOrigins',
  Externalauths = '_externalAuths',
  Mfas = '_mfas',
  Otps = '_otps',
  Superusers = '_superusers',
  CrmCampaignContacts = 'crm_campaign_contacts',
  CrmCampaigns = 'crm_campaigns',
  CrmCases = 'crm_cases',
  CrmCompanies = 'crm_companies',
  CrmContacts = 'crm_contacts',
  CrmInteractions = 'crm_interactions',
  CrmInvoiceLineItems = 'crm_invoice_line_items',
  CrmInvoices = 'crm_invoices',
  CrmLeads = 'crm_leads',
  CrmOpportunities = 'crm_opportunities',
  CrmOpportunityProducts = 'crm_opportunity_products',
  CrmProducts = 'crm_products',
  LmsAddresses = 'lms_addresses',
  LmsPackages = 'lms_packages',
  LmsPricingRates = 'lms_pricing_rates',
  LmsPricingZoneCountries = 'lms_pricing_zone_countries',
  LmsPricingZones = 'lms_pricing_zones',
  LmsProviderInvoiceLineItems = 'lms_provider_invoice_line_items',
  LmsProviderInvoices = 'lms_provider_invoices',
  LmsProviderPerformance = 'lms_provider_performance',
  LmsProviderRates = 'lms_provider_rates',
  LmsProviderServiceDestinationCountries = 'lms_provider_service_destination_countries',
  LmsProviderServiceMaxDimensions = 'lms_provider_service_max_dimensions',
  LmsProviderServiceOriginCountries = 'lms_provider_service_origin_countries',
  LmsProviderServices = 'lms_provider_services',
  LmsShipments = 'lms_shipments',
  LmsShippingServiceMaxDimensions = 'lms_shipping_service_max_dimensions',
  LmsShippingServices = 'lms_shipping_services',
  LmsTrackingEvents = 'lms_tracking_events',
  LmsTransportProviders = 'lms_transport_providers',
  LmsWarehouseInventories = 'lms_warehouse_inventories',
  LmsWarehouses = 'lms_warehouses',
  OrgOrganization = 'org_organization',
  OrgRoleActions = 'org_role_actions',
  OrgRoles = 'org_roles',
  OrgTeamMembers = 'org_team_members',
  OrgTeamResources = 'org_team_resources',
  OrgTeamRoles = 'org_team_roles',
  OrgTeams = 'org_teams',
  TmsDrivers = 'tms_drivers',
  TmsVehicles = 'tms_vehicles',
  Users = 'users',
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

export type GeoPoint = {
  lon: number;
  lat: number;
};

type ExpandType<T> = unknown extends T
  ? T extends unknown
    ? { expand?: unknown }
    : { expand: T }
  : { expand: T };

// System fields
export type BaseSystemFields<T = unknown> = {
  id: RecordIdString;
  collectionId: string;
  collectionName: Collections;
} & ExpandType<T>;

export type AuthSystemFields<T = unknown> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type AuthoriginsRecord = {
  collectionRef: string;
  created?: IsoDateString;
  fingerprint: string;
  id: string;
  recordRef: string;
  updated?: IsoDateString;
};

export type ExternalauthsRecord = {
  collectionRef: string;
  created?: IsoDateString;
  id: string;
  provider: string;
  providerId: string;
  recordRef: string;
  updated?: IsoDateString;
};

export type MfasRecord = {
  collectionRef: string;
  created?: IsoDateString;
  id: string;
  method: string;
  recordRef: string;
  updated?: IsoDateString;
};

export type OtpsRecord = {
  collectionRef: string;
  created?: IsoDateString;
  id: string;
  password: string;
  recordRef: string;
  sentTo?: string;
  updated?: IsoDateString;
};

export type SuperusersRecord = {
  created?: IsoDateString;
  email: string;
  emailVisibility?: boolean;
  id: string;
  password: string;
  tokenKey: string;
  updated?: IsoDateString;
  verified?: boolean;
};

export enum CrmCampaignContactsStatusOptions {
  sent = 'sent',
  opened = 'opened',
  clicked = 'clicked',
  responded = 'responded',
  unsubscribe = 'unsubscribe',
}
export type CrmCampaignContactsRecord = {
  campaign: RecordIdString;
  contact: RecordIdString;
  created?: IsoDateString;
  id: string;
  interaction_date: IsoDateString;
  status: CrmCampaignContactsStatusOptions;
  updated?: IsoDateString;
};

export enum CrmCampaignsStatusOptions {
  planned = 'planned',
  active = 'active',
  completed = 'completed',
  paused = 'paused',
}
export type CrmCampaignsRecord = {
  budget?: number;
  created?: IsoDateString;
  description?: HTMLString;
  end_date?: IsoDateString;
  id: string;
  name: string;
  start_date: IsoDateString;
  status?: CrmCampaignsStatusOptions;
  updated?: IsoDateString;
};

export enum CrmCasesStatusOptions {
  open = 'open',
  in_progress = 'in_progress',
  pending_customer = 'pending_customer',
  closed = 'closed',
}

export enum CrmCasesPriorityOptions {
  low = 'low',
  medium = 'medium',
  high = 'high',
  critical = 'critical',
}
export type CrmCasesRecord = {
  closed_at?: IsoDateString;
  contact?: RecordIdString;
  created?: IsoDateString;
  description: HTMLString;
  id: string;
  priority?: CrmCasesPriorityOptions;
  status: CrmCasesStatusOptions;
  subject: string;
  updated?: IsoDateString;
};

export type CrmCompaniesRecord = {
  created?: IsoDateString;
  description?: HTMLString;
  email?: string;
  id: string;
  industry?: string;
  name: string;
  phone_number?: string;
  updated?: IsoDateString;
  website?: string;
};

export enum CrmContactsStatusOptions {
  lead = 'lead',
  prospect = 'prospect',
  customer = 'customer',
  inactive = 'inactive',
}
export type CrmContactsRecord = {
  birth_date?: IsoDateString;
  company?: RecordIdString;
  created?: IsoDateString;
  email: string;
  first_name: string;
  id: string;
  job_title?: string;
  last_name: string;
  lead_source?: string;
  phone_number?: string;
  status?: CrmContactsStatusOptions;
  updated?: IsoDateString;
};

export enum CrmInteractionsTypeOptions {
  call = 'call',
  email = 'email',
  meeting = 'meeting',
  chat = 'chat',
  note = 'note',
}
export type CrmInteractionsRecord = {
  contact?: RecordIdString;
  created?: IsoDateString;
  description?: HTMLString;
  id: string;
  interaction_date: IsoDateString;
  opportunity?: RecordIdString;
  subject?: string;
  type: CrmInteractionsTypeOptions;
  updated?: IsoDateString;
};

export type CrmInvoiceLineItemsRecord = {
  created?: IsoDateString;
  description?: HTMLString;
  id: string;
  invoice?: RecordIdString;
  line_total?: number;
  quantity: number;
  shipment?: RecordIdString;
  unit_price?: number;
  updated?: IsoDateString;
};

export enum CrmInvoicesStatusOptions {
  paid = 'paid',
  draft = 'draft',
  sent = 'sent',
  overdue = 'overdue',
  cancelled = 'cancelled',
}
export type CrmInvoicesRecord = {
  company: RecordIdString;
  contact?: RecordIdString;
  created?: IsoDateString;
  currency: string;
  due_date: IsoDateString;
  id: string;
  invoice_date: IsoDateString;
  invoice_number: string;
  payment_terms?: HTMLString;
  status?: CrmInvoicesStatusOptions;
  subtotal: number;
  tax_amount: number;
  updated?: IsoDateString;
};

export enum CrmLeadsLeadStatusOptions {
  new = 'new',
  qualified = 'qualified',
  contacted = 'contacted',
  unqualified = 'unqualified',
}
export type CrmLeadsRecord = {
  company_name?: string;
  converted_to_contact?: RecordIdString;
  created?: IsoDateString;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  lead_score?: number;
  lead_source?: string;
  lead_status?: CrmLeadsLeadStatusOptions;
  phone_number?: string;
  updated?: IsoDateString;
};

export enum CrmOpportunitiesStageOptions {
  prospecting = 'prospecting',
  qualification = 'qualification',
  proposal = 'proposal',
  'closed-won' = 'closed-won',
  'closed-lost' = 'closed-lost',
}
export type CrmOpportunitiesRecord = {
  amount: number;
  close_date?: IsoDateString;
  company?: RecordIdString;
  created?: IsoDateString;
  id: string;
  name: string;
  primary_contact?: RecordIdString;
  probability?: number;
  stage: CrmOpportunitiesStageOptions;
  updated?: IsoDateString;
};

export type CrmOpportunityProductsRecord = {
  created?: IsoDateString;
  id: string;
  opportunity: RecordIdString;
  product: RecordIdString;
  quantity: number;
  unit_price: number;
  updated?: IsoDateString;
};

export type CrmProductsRecord = {
  created?: IsoDateString;
  description?: HTMLString;
  id: string;
  name: string;
  price?: number;
  sku?: string;
  updated?: IsoDateString;
};

export enum LmsAddressesTypeOptions {
  shipping = 'shipping',
  billing = 'billing',
  warehouse = 'warehouse',
  office = 'office',
}
export type LmsAddressesRecord = {
  address_line_1: string;
  address_line_2: string;
  city: string;
  coordinates?: GeoPoint;
  created?: IsoDateString;
  id: string;
  is_validated?: boolean;
  postal_code: string;
  state: string;
  type?: LmsAddressesTypeOptions;
  updated?: IsoDateString;
};

export enum LmsPackagesTypeOptions {
  box = 'box',
  envelope = 'envelope',
  tube = 'tube',
  pallet = 'pallet',
  crate = 'crate',
  bag = 'bag',
}
export type LmsPackagesRecord = {
  created?: IsoDateString;
  declared_value?: number;
  description?: HTMLString;
  height?: number;
  id: string;
  length?: number;
  package_number: string;
  shipment: RecordIdString;
  type: LmsPackagesTypeOptions;
  updated?: IsoDateString;
  weight?: number;
};

export type LmsPricingRatesRecord = {
  base_rate: number;
  created?: IsoDateString;
  destination_zone: RecordIdString;
  effective_date: IsoDateString;
  expiry_date?: IsoDateString;
  fuel_surcharge_rate: number;
  id: string;
  origin_zone: RecordIdString;
  per_kg_rate: number;
  shipping_service: RecordIdString;
  updated?: IsoDateString;
  weight_max: number;
  weight_min: number;
};

export type LmsPricingZoneCountriesRecord = {
  country_code: string;
  created?: IsoDateString;
  id: string;
  pricing_zone: RecordIdString;
  updated?: IsoDateString;
};

export type LmsPricingZonesRecord = {
  created?: IsoDateString;
  id: string;
  name: string;
  updated?: IsoDateString;
  zone_code: string;
};

export type LmsProviderInvoiceLineItemsRecord = {
  created?: IsoDateString;
  description: HTMLString;
  id: string;
  line_total?: number;
  provider_invoice: RecordIdString;
  quantity?: number;
  unit_price?: number;
  updated?: IsoDateString;
};

export enum LmsProviderInvoicesStatusOptions {
  draft = 'draft',
  sent = 'sent',
  paid = 'paid',
  overdue = 'overdue',
  cancelled = 'cancelled',
}
export type LmsProviderInvoicesRecord = {
  created?: IsoDateString;
  currency: string;
  due_date: IsoDateString;
  id: string;
  invoice_date: IsoDateString;
  invoice_number: string;
  payment_date?: IsoDateString;
  provider?: RecordIdString;
  status?: LmsProviderInvoicesStatusOptions;
  subtotal: number;
  tax_amount: number;
  total_amount?: number;
  updated?: IsoDateString;
};

export enum LmsProviderPerformanceMetricTypeOptions {
  on_time_delivery = 'on_time_delivery',
  damage_rate = 'damage_rate',
  cost_efficiency = 'cost_efficiency',
  customer_satisfaction = 'customer_satisfaction',
}
export type LmsProviderPerformanceRecord = {
  created?: IsoDateString;
  id: string;
  measurement_date: IsoDateString;
  metric_type: LmsProviderPerformanceMetricTypeOptions;
  metric_value: number;
  notes?: HTMLString;
  provider: RecordIdString;
  shipment: RecordIdString;
  updated?: IsoDateString;
};

export type LmsProviderRatesRecord = {
  base_rate?: number;
  created?: IsoDateString;
  currency: string;
  destination_zones?: RecordIdString;
  effective_date: IsoDateString;
  expiry_date?: IsoDateString;
  fuel_surcharge_rate?: number;
  id: string;
  origin_zone?: RecordIdString;
  per_kg_rate?: number;
  provider?: RecordIdString;
  updated?: IsoDateString;
  weight_max?: number;
  weight_min?: number;
};

export type LmsProviderServiceDestinationCountriesRecord = {
  country_code: string;
  created?: IsoDateString;
  id: string;
  provider: RecordIdString;
  updated?: IsoDateString;
};

export type LmsProviderServiceMaxDimensionsRecord = {
  created?: IsoDateString;
  height?: number;
  id: string;
  length?: number;
  provider: RecordIdString;
  updated?: IsoDateString;
  width?: number;
};

export type LmsProviderServiceOriginCountriesRecord = {
  country_code: string;
  created?: IsoDateString;
  id: string;
  provider: RecordIdString;
  updated?: IsoDateString;
};

export enum LmsProviderServicesTypeOptions {
  standard = 'standard',
  express = 'express',
  overnight = 'overnight',
  economy = 'economy',
  freight = 'freight',
}

export enum LmsProviderServicesTransportModeOptions {
  air = 'air',
  sea = 'sea',
  road = 'road',
  rail = 'rail',
}
export type LmsProviderServicesRecord = {
  created?: IsoDateString;
  cutoff_time?: IsoDateString;
  id: string;
  insurance_available?: boolean;
  is_active?: boolean;
  max_weight?: number;
  name?: string;
  provider: RecordIdString;
  tracking_available?: boolean;
  transit_time_max?: number;
  transit_time_min?: number;
  transport_mode: LmsProviderServicesTransportModeOptions;
  type: LmsProviderServicesTypeOptions;
  updated?: IsoDateString;
};

export enum LmsShipmentsPrimaryTransportModeOptions {
  air = 'air',
  sea = 'sea',
  road = 'road',
  rail = 'rail',
}

export enum LmsShipmentsStatusOptions {
  created = 'created',
  picked_up = 'picked_up',
  in_transit = 'in_transit',
  out_for_delivery = 'out_for_delivery',
  delivered = 'delivered',
  exception = 'exception',
  cancelled = 'cancelled',
}
export type LmsShipmentsRecord = {
  created?: IsoDateString;
  created_by: RecordIdString;
  currency: string;
  delivery_date?: IsoDateString;
  estimated_delivery_date?: IsoDateString;
  id: string;
  insurance_amount?: number;
  pickup_date?: IsoDateString;
  primary_transport_mode: LmsShipmentsPrimaryTransportModeOptions;
  receiver_address: RecordIdString;
  receiver_company?: RecordIdString;
  receiver_contact?: RecordIdString;
  sender_address: RecordIdString;
  sender_company?: RecordIdString;
  sender_contact?: RecordIdString;
  shipping_cost?: number;
  shipping_service: RecordIdString;
  special_instructions?: HTMLString;
  status: LmsShipmentsStatusOptions;
  total_value?: number;
  total_weight: number;
  tracking_number: string;
  updated?: IsoDateString;
};

export type LmsShippingServiceMaxDimensionsRecord = {
  created?: IsoDateString;
  height?: number;
  id: string;
  length?: number;
  shipping_service: RecordIdString;
  updated?: IsoDateString;
  width?: number;
};

export enum LmsShippingServicesTypeOptions {
  standard = 'standard',
  express = 'express',
  overnight = 'overnight',
  economy = 'economy',
  freight = 'freight',
}
export type LmsShippingServicesRecord = {
  created?: IsoDateString;
  delivery_time_max: number;
  delivery_time_min: number;
  description?: HTMLString;
  id: string;
  is_active?: boolean;
  max_weight?: number;
  name: string;
  type: LmsShippingServicesTypeOptions;
  updated?: IsoDateString;
};

export enum LmsTrackingEventsTypeOptions {
  created = 'created',
  picked_up = 'picked_up',
  departed = 'departed',
  arrived = 'arrived',
  out_for_delivery = 'out_for_delivery',
  delivered = 'delivered',
  exception = 'exception',
  cancelled = 'cancelled',
}
export type LmsTrackingEventsRecord = {
  created?: IsoDateString;
  description?: HTMLString;
  id: string;
  location?: GeoPoint;
  shipment: RecordIdString;
  type: LmsTrackingEventsTypeOptions;
  updated?: IsoDateString;
};

export enum LmsTransportProvidersTypeOptions {
  courier = 'courier',
  freight = 'freight',
  postal = 'postal',
  express = 'express',
  full_truckload = 'full_truckload',
  less_than_truck_load = 'less_than_truck_load',
}
export type LmsTransportProvidersRecord = {
  address?: RecordIdString;
  api_endpoint?: string;
  api_key?: string;
  company_name: string;
  contact_person?: string;
  contract_end_date?: IsoDateString;
  contract_start_date?: IsoDateString;
  created?: IsoDateString;
  email?: string;
  id: string;
  insurance_coverage?: number;
  is_active?: boolean;
  payment_terms?: HTMLString;
  performance_rating?: number;
  phone_number?: string;
  type: LmsTransportProvidersTypeOptions;
  updated?: IsoDateString;
};

export enum LmsWarehouseInventoriesStatusOptions {
  received = 'received',
  stored = 'stored',
  picked = 'picked',
  shipped = 'shipped',
}
export type LmsWarehouseInventoriesRecord = {
  arrived_at?: IsoDateString;
  created?: IsoDateString;
  departed_at?: IsoDateString;
  id: string;
  location_code?: string;
  package?: RecordIdString;
  shipment?: RecordIdString;
  status: LmsWarehouseInventoriesStatusOptions;
  updated?: IsoDateString;
  warehouse?: RecordIdString;
};

export enum LmsWarehousesTypeOptions {
  distribution = 'distribution',
  fulfillment = 'fulfillment',
  cross_dock = 'cross_dock',
  cold_storage = 'cold_storage',
  bonded = 'bonded',
}
export type LmsWarehousesRecord = {
  address: RecordIdString;
  capacity?: number;
  code: string;
  created?: IsoDateString;
  id: string;
  is_active?: boolean;
  manager?: RecordIdString;
  name: string;
  type: LmsWarehousesTypeOptions;
  updated?: IsoDateString;
};

export type OrgOrganizationRecord = {
  created?: IsoDateString;
  id: string;
  name: string;
  owner: RecordIdString;
  updated?: IsoDateString;
};

export enum OrgRoleActionsActionOptions {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
}
export type OrgRoleActionsRecord = {
  action: OrgRoleActionsActionOptions;
  created?: IsoDateString;
  id: string;
  role: RecordIdString;
  updated?: IsoDateString;
};

export type OrgRolesRecord = {
  created?: IsoDateString;
  description?: HTMLString;
  id: string;
  name: string;
  organization?: RecordIdString;
  updated?: IsoDateString;
};

export type OrgTeamMembersRecord = {
  created?: IsoDateString;
  id: string;
  team: RecordIdString;
  updated?: IsoDateString;
  user: RecordIdString;
};

export type OrgTeamResourcesRecord = {
  created?: IsoDateString;
  id: string;
  resource: string;
  updated?: IsoDateString;
};

export type OrgTeamRolesRecord = {
  created?: IsoDateString;
  id: string;
  roles: RecordIdString;
  team: RecordIdString;
  updated?: IsoDateString;
};

export type OrgTeamsRecord = {
  created?: IsoDateString;
  description: HTMLString;
  id: string;
  name: string;
  organization: RecordIdString;
  updated?: IsoDateString;
};

export enum TmsDriversStatusOptions {
  active = 'active',
  inactive = 'inactive',
  on_leave = 'on_leave',
  terminated = 'terminated',
}
export type TmsDriversRecord = {
  created?: IsoDateString;
  email: string;
  employee_id: string;
  first_name: string;
  hire_date: IsoDateString;
  id: string;
  last_name: string;
  license_number: string;
  phone_number: string;
  status: TmsDriversStatusOptions;
  updated?: IsoDateString;
};

export enum TmsVehiclesVehicleTypeOptions {
  van = 'van',
  truck = 'truck',
  trailer = 'trailer',
  motorcycle = 'motorcycle',
  car = 'car',
}

export enum TmsVehiclesStatusOptions {
  active = 'active',
  maintenance = 'maintenance',
  retired = 'retired',
  'out-of-service' = 'out-of-service',
}
export type TmsVehiclesRecord = {
  capacity_volume?: number;
  capacity_weight?: number;
  created?: IsoDateString;
  id: string;
  license_plate: string;
  make: string;
  model: string;
  status?: TmsVehiclesStatusOptions;
  updated?: IsoDateString;
  vehicle_number: string;
  vehicle_type?: TmsVehiclesVehicleTypeOptions;
  year: IsoDateString;
};

export type UsersRecord = {
  avatar?: string;
  created?: IsoDateString;
  email: string;
  emailVisibility?: boolean;
  id: string;
  name?: string;
  password: string;
  tokenKey: string;
  updated?: IsoDateString;
  verified?: boolean;
};

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> =
  Required<AuthoriginsRecord> & BaseSystemFields<Texpand>;
export type ExternalauthsResponse<Texpand = unknown> =
  Required<ExternalauthsRecord> & BaseSystemFields<Texpand>;
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> &
  BaseSystemFields<Texpand>;
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> &
  BaseSystemFields<Texpand>;
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> &
  AuthSystemFields<Texpand>;
export type CrmCampaignContactsResponse<Texpand = unknown> =
  Required<CrmCampaignContactsRecord> & BaseSystemFields<Texpand>;
export type CrmCampaignsResponse<Texpand = unknown> =
  Required<CrmCampaignsRecord> & BaseSystemFields<Texpand>;
export type CrmCasesResponse<Texpand = unknown> = Required<CrmCasesRecord> &
  BaseSystemFields<Texpand>;
export type CrmCompaniesResponse<Texpand = unknown> =
  Required<CrmCompaniesRecord> & BaseSystemFields<Texpand>;
export type CrmContactsResponse<Texpand = unknown> =
  Required<CrmContactsRecord> & BaseSystemFields<Texpand>;
export type CrmInteractionsResponse<Texpand = unknown> =
  Required<CrmInteractionsRecord> & BaseSystemFields<Texpand>;
export type CrmInvoiceLineItemsResponse<Texpand = unknown> =
  Required<CrmInvoiceLineItemsRecord> & BaseSystemFields<Texpand>;
export type CrmInvoicesResponse<Texpand = unknown> =
  Required<CrmInvoicesRecord> & BaseSystemFields<Texpand>;
export type CrmLeadsResponse<Texpand = unknown> = Required<CrmLeadsRecord> &
  BaseSystemFields<Texpand>;
export type CrmOpportunitiesResponse<Texpand = unknown> =
  Required<CrmOpportunitiesRecord> & BaseSystemFields<Texpand>;
export type CrmOpportunityProductsResponse<Texpand = unknown> =
  Required<CrmOpportunityProductsRecord> & BaseSystemFields<Texpand>;
export type CrmProductsResponse<Texpand = unknown> =
  Required<CrmProductsRecord> & BaseSystemFields<Texpand>;
export type LmsAddressesResponse<Texpand = unknown> =
  Required<LmsAddressesRecord> & BaseSystemFields<Texpand>;
export type LmsPackagesResponse<Texpand = unknown> =
  Required<LmsPackagesRecord> & BaseSystemFields<Texpand>;
export type LmsPricingRatesResponse<Texpand = unknown> =
  Required<LmsPricingRatesRecord> & BaseSystemFields<Texpand>;
export type LmsPricingZoneCountriesResponse<Texpand = unknown> =
  Required<LmsPricingZoneCountriesRecord> & BaseSystemFields<Texpand>;
export type LmsPricingZonesResponse<Texpand = unknown> =
  Required<LmsPricingZonesRecord> & BaseSystemFields<Texpand>;
export type LmsProviderInvoiceLineItemsResponse<Texpand = unknown> =
  Required<LmsProviderInvoiceLineItemsRecord> & BaseSystemFields<Texpand>;
export type LmsProviderInvoicesResponse<Texpand = unknown> =
  Required<LmsProviderInvoicesRecord> & BaseSystemFields<Texpand>;
export type LmsProviderPerformanceResponse<Texpand = unknown> =
  Required<LmsProviderPerformanceRecord> & BaseSystemFields<Texpand>;
export type LmsProviderRatesResponse<Texpand = unknown> =
  Required<LmsProviderRatesRecord> & BaseSystemFields<Texpand>;
export type LmsProviderServiceDestinationCountriesResponse<Texpand = unknown> =
  Required<LmsProviderServiceDestinationCountriesRecord> &
    BaseSystemFields<Texpand>;
export type LmsProviderServiceMaxDimensionsResponse<Texpand = unknown> =
  Required<LmsProviderServiceMaxDimensionsRecord> & BaseSystemFields<Texpand>;
export type LmsProviderServiceOriginCountriesResponse<Texpand = unknown> =
  Required<LmsProviderServiceOriginCountriesRecord> & BaseSystemFields<Texpand>;
export type LmsProviderServicesResponse<Texpand = unknown> =
  Required<LmsProviderServicesRecord> & BaseSystemFields<Texpand>;
export type LmsShipmentsResponse<Texpand = unknown> =
  Required<LmsShipmentsRecord> & BaseSystemFields<Texpand>;
export type LmsShippingServiceMaxDimensionsResponse<Texpand = unknown> =
  Required<LmsShippingServiceMaxDimensionsRecord> & BaseSystemFields<Texpand>;
export type LmsShippingServicesResponse<Texpand = unknown> =
  Required<LmsShippingServicesRecord> & BaseSystemFields<Texpand>;
export type LmsTrackingEventsResponse<Texpand = unknown> =
  Required<LmsTrackingEventsRecord> & BaseSystemFields<Texpand>;
export type LmsTransportProvidersResponse<Texpand = unknown> =
  Required<LmsTransportProvidersRecord> & BaseSystemFields<Texpand>;
export type LmsWarehouseInventoriesResponse<Texpand = unknown> =
  Required<LmsWarehouseInventoriesRecord> & BaseSystemFields<Texpand>;
export type LmsWarehousesResponse<Texpand = unknown> =
  Required<LmsWarehousesRecord> & BaseSystemFields<Texpand>;
export type OrgOrganizationResponse<Texpand = unknown> =
  Required<OrgOrganizationRecord> & BaseSystemFields<Texpand>;
export type OrgRoleActionsResponse<Texpand = unknown> =
  Required<OrgRoleActionsRecord> & BaseSystemFields<Texpand>;
export type OrgRolesResponse<Texpand = unknown> = Required<OrgRolesRecord> &
  BaseSystemFields<Texpand>;
export type OrgTeamMembersResponse<Texpand = unknown> =
  Required<OrgTeamMembersRecord> & BaseSystemFields<Texpand>;
export type OrgTeamResourcesResponse<Texpand = unknown> =
  Required<OrgTeamResourcesRecord> & BaseSystemFields<Texpand>;
export type OrgTeamRolesResponse<Texpand = unknown> =
  Required<OrgTeamRolesRecord> & BaseSystemFields<Texpand>;
export type OrgTeamsResponse<Texpand = unknown> = Required<OrgTeamsRecord> &
  BaseSystemFields<Texpand>;
export type TmsDriversResponse<Texpand = unknown> = Required<TmsDriversRecord> &
  BaseSystemFields<Texpand>;
export type TmsVehiclesResponse<Texpand = unknown> =
  Required<TmsVehiclesRecord> & BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> &
  AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  _authOrigins: AuthoriginsRecord;
  _externalAuths: ExternalauthsRecord;
  _mfas: MfasRecord;
  _otps: OtpsRecord;
  _superusers: SuperusersRecord;
  crm_campaign_contacts: CrmCampaignContactsRecord;
  crm_campaigns: CrmCampaignsRecord;
  crm_cases: CrmCasesRecord;
  crm_companies: CrmCompaniesRecord;
  crm_contacts: CrmContactsRecord;
  crm_interactions: CrmInteractionsRecord;
  crm_invoice_line_items: CrmInvoiceLineItemsRecord;
  crm_invoices: CrmInvoicesRecord;
  crm_leads: CrmLeadsRecord;
  crm_opportunities: CrmOpportunitiesRecord;
  crm_opportunity_products: CrmOpportunityProductsRecord;
  crm_products: CrmProductsRecord;
  lms_addresses: LmsAddressesRecord;
  lms_packages: LmsPackagesRecord;
  lms_pricing_rates: LmsPricingRatesRecord;
  lms_pricing_zone_countries: LmsPricingZoneCountriesRecord;
  lms_pricing_zones: LmsPricingZonesRecord;
  lms_provider_invoice_line_items: LmsProviderInvoiceLineItemsRecord;
  lms_provider_invoices: LmsProviderInvoicesRecord;
  lms_provider_performance: LmsProviderPerformanceRecord;
  lms_provider_rates: LmsProviderRatesRecord;
  lms_provider_service_destination_countries: LmsProviderServiceDestinationCountriesRecord;
  lms_provider_service_max_dimensions: LmsProviderServiceMaxDimensionsRecord;
  lms_provider_service_origin_countries: LmsProviderServiceOriginCountriesRecord;
  lms_provider_services: LmsProviderServicesRecord;
  lms_shipments: LmsShipmentsRecord;
  lms_shipping_service_max_dimensions: LmsShippingServiceMaxDimensionsRecord;
  lms_shipping_services: LmsShippingServicesRecord;
  lms_tracking_events: LmsTrackingEventsRecord;
  lms_transport_providers: LmsTransportProvidersRecord;
  lms_warehouse_inventories: LmsWarehouseInventoriesRecord;
  lms_warehouses: LmsWarehousesRecord;
  org_organization: OrgOrganizationRecord;
  org_role_actions: OrgRoleActionsRecord;
  org_roles: OrgRolesRecord;
  org_team_members: OrgTeamMembersRecord;
  org_team_resources: OrgTeamResourcesRecord;
  org_team_roles: OrgTeamRolesRecord;
  org_teams: OrgTeamsRecord;
  tms_drivers: TmsDriversRecord;
  tms_vehicles: TmsVehiclesRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  _authOrigins: AuthoriginsResponse;
  _externalAuths: ExternalauthsResponse;
  _mfas: MfasResponse;
  _otps: OtpsResponse;
  _superusers: SuperusersResponse;
  crm_campaign_contacts: CrmCampaignContactsResponse;
  crm_campaigns: CrmCampaignsResponse;
  crm_cases: CrmCasesResponse;
  crm_companies: CrmCompaniesResponse;
  crm_contacts: CrmContactsResponse;
  crm_interactions: CrmInteractionsResponse;
  crm_invoice_line_items: CrmInvoiceLineItemsResponse;
  crm_invoices: CrmInvoicesResponse;
  crm_leads: CrmLeadsResponse;
  crm_opportunities: CrmOpportunitiesResponse;
  crm_opportunity_products: CrmOpportunityProductsResponse;
  crm_products: CrmProductsResponse;
  lms_addresses: LmsAddressesResponse;
  lms_packages: LmsPackagesResponse;
  lms_pricing_rates: LmsPricingRatesResponse;
  lms_pricing_zone_countries: LmsPricingZoneCountriesResponse;
  lms_pricing_zones: LmsPricingZonesResponse;
  lms_provider_invoice_line_items: LmsProviderInvoiceLineItemsResponse;
  lms_provider_invoices: LmsProviderInvoicesResponse;
  lms_provider_performance: LmsProviderPerformanceResponse;
  lms_provider_rates: LmsProviderRatesResponse;
  lms_provider_service_destination_countries: LmsProviderServiceDestinationCountriesResponse;
  lms_provider_service_max_dimensions: LmsProviderServiceMaxDimensionsResponse;
  lms_provider_service_origin_countries: LmsProviderServiceOriginCountriesResponse;
  lms_provider_services: LmsProviderServicesResponse;
  lms_shipments: LmsShipmentsResponse;
  lms_shipping_service_max_dimensions: LmsShippingServiceMaxDimensionsResponse;
  lms_shipping_services: LmsShippingServicesResponse;
  lms_tracking_events: LmsTrackingEventsResponse;
  lms_transport_providers: LmsTransportProvidersResponse;
  lms_warehouse_inventories: LmsWarehouseInventoriesResponse;
  lms_warehouses: LmsWarehousesResponse;
  org_organization: OrgOrganizationResponse;
  org_role_actions: OrgRoleActionsResponse;
  org_roles: OrgRolesResponse;
  org_team_members: OrgTeamMembersResponse;
  org_team_resources: OrgTeamResourcesResponse;
  org_team_roles: OrgTeamRolesResponse;
  org_teams: OrgTeamsResponse;
  tms_drivers: TmsDriversResponse;
  tms_vehicles: TmsVehiclesResponse;
  users: UsersResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>;
  collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>;
  collection(idOrName: '_mfas'): RecordService<MfasResponse>;
  collection(idOrName: '_otps'): RecordService<OtpsResponse>;
  collection(idOrName: '_superusers'): RecordService<SuperusersResponse>;
  collection(
    idOrName: 'crm_campaign_contacts',
  ): RecordService<CrmCampaignContactsResponse>;
  collection(idOrName: 'crm_campaigns'): RecordService<CrmCampaignsResponse>;
  collection(idOrName: 'crm_cases'): RecordService<CrmCasesResponse>;
  collection(idOrName: 'crm_companies'): RecordService<CrmCompaniesResponse>;
  collection(idOrName: 'crm_contacts'): RecordService<CrmContactsResponse>;
  collection(
    idOrName: 'crm_interactions',
  ): RecordService<CrmInteractionsResponse>;
  collection(
    idOrName: 'crm_invoice_line_items',
  ): RecordService<CrmInvoiceLineItemsResponse>;
  collection(idOrName: 'crm_invoices'): RecordService<CrmInvoicesResponse>;
  collection(idOrName: 'crm_leads'): RecordService<CrmLeadsResponse>;
  collection(
    idOrName: 'crm_opportunities',
  ): RecordService<CrmOpportunitiesResponse>;
  collection(
    idOrName: 'crm_opportunity_products',
  ): RecordService<CrmOpportunityProductsResponse>;
  collection(idOrName: 'crm_products'): RecordService<CrmProductsResponse>;
  collection(idOrName: 'lms_addresses'): RecordService<LmsAddressesResponse>;
  collection(idOrName: 'lms_packages'): RecordService<LmsPackagesResponse>;
  collection(
    idOrName: 'lms_pricing_rates',
  ): RecordService<LmsPricingRatesResponse>;
  collection(
    idOrName: 'lms_pricing_zone_countries',
  ): RecordService<LmsPricingZoneCountriesResponse>;
  collection(
    idOrName: 'lms_pricing_zones',
  ): RecordService<LmsPricingZonesResponse>;
  collection(
    idOrName: 'lms_provider_invoice_line_items',
  ): RecordService<LmsProviderInvoiceLineItemsResponse>;
  collection(
    idOrName: 'lms_provider_invoices',
  ): RecordService<LmsProviderInvoicesResponse>;
  collection(
    idOrName: 'lms_provider_performance',
  ): RecordService<LmsProviderPerformanceResponse>;
  collection(
    idOrName: 'lms_provider_rates',
  ): RecordService<LmsProviderRatesResponse>;
  collection(
    idOrName: 'lms_provider_service_destination_countries',
  ): RecordService<LmsProviderServiceDestinationCountriesResponse>;
  collection(
    idOrName: 'lms_provider_service_max_dimensions',
  ): RecordService<LmsProviderServiceMaxDimensionsResponse>;
  collection(
    idOrName: 'lms_provider_service_origin_countries',
  ): RecordService<LmsProviderServiceOriginCountriesResponse>;
  collection(
    idOrName: 'lms_provider_services',
  ): RecordService<LmsProviderServicesResponse>;
  collection(idOrName: 'lms_shipments'): RecordService<LmsShipmentsResponse>;
  collection(
    idOrName: 'lms_shipping_service_max_dimensions',
  ): RecordService<LmsShippingServiceMaxDimensionsResponse>;
  collection(
    idOrName: 'lms_shipping_services',
  ): RecordService<LmsShippingServicesResponse>;
  collection(
    idOrName: 'lms_tracking_events',
  ): RecordService<LmsTrackingEventsResponse>;
  collection(
    idOrName: 'lms_transport_providers',
  ): RecordService<LmsTransportProvidersResponse>;
  collection(
    idOrName: 'lms_warehouse_inventories',
  ): RecordService<LmsWarehouseInventoriesResponse>;
  collection(idOrName: 'lms_warehouses'): RecordService<LmsWarehousesResponse>;
  collection(
    idOrName: 'org_organization',
  ): RecordService<OrgOrganizationResponse>;
  collection(
    idOrName: 'org_role_actions',
  ): RecordService<OrgRoleActionsResponse>;
  collection(idOrName: 'org_roles'): RecordService<OrgRolesResponse>;
  collection(
    idOrName: 'org_team_members',
  ): RecordService<OrgTeamMembersResponse>;
  collection(
    idOrName: 'org_team_resources',
  ): RecordService<OrgTeamResourcesResponse>;
  collection(idOrName: 'org_team_roles'): RecordService<OrgTeamRolesResponse>;
  collection(idOrName: 'org_teams'): RecordService<OrgTeamsResponse>;
  collection(idOrName: 'tms_drivers'): RecordService<TmsDriversResponse>;
  collection(idOrName: 'tms_vehicles'): RecordService<TmsVehiclesResponse>;
  collection(idOrName: 'users'): RecordService<UsersResponse>;
};
