import { createAccessControl } from 'better-auth/plugins/access';
import { adminAc, defaultStatements } from 'better-auth/plugins/admin/access';
import { z } from 'zod';

export const statement = {
  ...defaultStatements,
  // Auth
  user: ['create', 'read', 'update', 'delete'],
  session: ['create', 'read', 'update', 'delete'],
  account: ['create', 'read', 'update', 'delete'],
  verification: ['create', 'read', 'update', 'delete'],

  // Billing
  billingRateCards: ['create', 'read', 'update', 'delete'],
  billingRateRules: ['create', 'read', 'update', 'delete'],
  billingSurcharges: ['create', 'read', 'update', 'delete'],
  billingQuotes: ['create', 'read', 'update', 'delete'],
  billingClientAccounts: ['create', 'read', 'update', 'delete'],
  billingAccountTransactions: ['create', 'read', 'update', 'delete'],
  billingInvoices: ['create', 'read', 'update', 'delete'],
  billingInvoiceLineItems: ['create', 'read', 'update', 'delete'],
  billingPayments: ['create', 'read', 'update', 'delete'],
  billingDisputes: ['create', 'read', 'update', 'delete'],
  billingCreditNotes: ['create', 'read', 'update', 'delete'],
  billingDocuments: ['create', 'read', 'update', 'delete'],
  billingAccountingSyncLog: ['create', 'read', 'update', 'delete'],

  // CRM
  companies: ['create', 'read', 'update', 'delete'],
  contacts: ['create', 'read', 'update', 'delete'],
  interactions: ['create', 'read', 'update', 'delete'],
  campaigns: ['create', 'read', 'update', 'delete'],
  leads: ['create', 'read', 'update', 'delete'],
  opportunities: ['create', 'read', 'update', 'delete'],
  products: ['create', 'read', 'update', 'delete'],
  opportunityProducts: ['create', 'read', 'update', 'delete'],
  cases: ['create', 'read', 'update', 'delete'],
  crmInvoices: ['create', 'read', 'update', 'delete'],
  crmInvoiceItems: ['create', 'read', 'update', 'delete'],
  notifications: ['create', 'read', 'update', 'delete'],
  attachments: ['create', 'read', 'update', 'delete'],
  tags: ['create', 'read', 'update', 'delete'],
  taggings: ['create', 'read', 'update', 'delete'],

  // DMS
  dmsDeliveryRoutes: ['create', 'read', 'update', 'delete'],
  dmsDeliveryTasks: ['create', 'read', 'update', 'delete'],
  dmsTaskEvents: ['create', 'read', 'update', 'delete'],
  dmsProofOfDeliveries: ['create', 'read', 'update', 'delete'],
  dmsDriverLocations: ['create', 'read', 'update', 'delete'],
  dmsCustomerTrackingLinks: ['create', 'read', 'update', 'delete'],

  // IMS
  imsProducts: ['create', 'read', 'update', 'delete'],
  imsSuppliers: ['create', 'read', 'update', 'delete'],
  imsInventoryBatches: ['create', 'read', 'update', 'delete'],
  imsInventoryAdjustments: ['create', 'read', 'update', 'delete'],
  imsReorderPoints: ['create', 'read', 'update', 'delete'],
  imsInboundShipments: ['create', 'read', 'update', 'delete'],
  imsInboundShipmentItems: ['create', 'read', 'update', 'delete'],
  imsStockTransfers: ['create', 'read', 'update', 'delete'],
  imsSalesOrders: ['create', 'read', 'update', 'delete'],
  imsSalesOrderItems: ['create', 'read', 'update', 'delete'],
  imsOutboundShipments: ['create', 'read', 'update', 'delete'],
  imsOutboundShipmentItems: ['create', 'read', 'update', 'delete'],
  imsReturns: ['create', 'read', 'update', 'delete'],
  imsReturnItems: ['create', 'read', 'update', 'delete'],

  // TMS
  tmsDrivers: ['create', 'read', 'update', 'delete'],
  tmsDriverSchedules: ['create', 'read', 'update', 'delete'],
  tmsVehicles: ['create', 'read', 'update', 'delete'],
  tmsVehicleMaintenance: ['create', 'read', 'update', 'delete'],
  tmsTrips: ['create', 'read', 'update', 'delete'],
  tmsTripStops: ['create', 'read', 'update', 'delete'],
  tmsGpsPings: ['create', 'read', 'update', 'delete'],
  tmsRoutes: ['create', 'read', 'update', 'delete'],
  tmsProofOfDeliveries: ['create', 'read', 'update', 'delete'],
  tmsExpenses: ['create', 'read', 'update', 'delete'],
  tmsGeofences: ['create', 'read', 'update', 'delete'],
  tmsGeofenceEvents: ['create', 'read', 'update', 'delete'],
  tmsCarriers: ['create', 'read', 'update', 'delete'],
  tmsCarrierRates: ['create', 'read', 'update', 'delete'],
  tmsShipmentLegs: ['create', 'read', 'update', 'delete'],
  tmsShipmentLegEvents: ['create', 'read', 'update', 'delete'],
  tmsPartnerInvoices: ['create', 'read', 'update', 'delete'],
  tmsPartnerInvoiceItems: ['create', 'read', 'update', 'delete'],

  // WMS
  wmsLocations: ['create', 'read', 'update', 'delete'],
  wmsWarehouses: ['create', 'read', 'update', 'delete'],
  wmsInventoryStock: ['create', 'read', 'update', 'delete'],
  wmsPutawayRules: ['create', 'read', 'update', 'delete'],
  wmsBinThresholds: ['create', 'read', 'update', 'delete'],
  wmsPickBatches: ['create', 'read', 'update', 'delete'],
  wmsPickBatchItems: ['create', 'read', 'update', 'delete'],
  wmsTasks: ['create', 'read', 'update', 'delete'],
  wmsTaskItems: ['create', 'read', 'update', 'delete'],
  wmsPackages: ['create', 'read', 'update', 'delete'],
  wmsPackageItems: ['create', 'read', 'update', 'delete'],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  ...adminAc.statements, // Inherit default admin permissions
  // Auth
  user: ['create', 'read', 'update', 'delete'],
  session: ['create', 'read', 'update', 'delete'],
  account: ['create', 'read', 'update', 'delete'],
  verification: ['create', 'read', 'update', 'delete'],

  // Billing
  billingRateCards: ['create', 'read', 'update', 'delete'],
  billingRateRules: ['create', 'read', 'update', 'delete'],
  billingSurcharges: ['create', 'read', 'update', 'delete'],
  billingQuotes: ['create', 'read', 'update', 'delete'],
  billingClientAccounts: ['create', 'read', 'update', 'delete'],
  billingAccountTransactions: ['create', 'read', 'update', 'delete'],
  billingInvoices: ['create', 'read', 'update', 'delete'],
  billingInvoiceLineItems: ['create', 'read', 'update', 'delete'],
  billingPayments: ['create', 'read', 'update', 'delete'],
  billingDisputes: ['create', 'read', 'update', 'delete'],
  billingCreditNotes: ['create', 'read', 'update', 'delete'],
  billingDocuments: ['create', 'read', 'update', 'delete'],
  billingAccountingSyncLog: ['create', 'read', 'update', 'delete'],

  // CRM
  companies: ['create', 'read', 'update', 'delete'],
  contacts: ['create', 'read', 'update', 'delete'],
  interactions: ['create', 'read', 'update', 'delete'],
  campaigns: ['create', 'read', 'update', 'delete'],
  leads: ['create', 'read', 'update', 'delete'],
  opportunities: ['create', 'read', 'update', 'delete'],
  products: ['create', 'read', 'update', 'delete'],
  opportunityProducts: ['create', 'read', 'update', 'delete'],
  cases: ['create', 'read', 'update', 'delete'],
  crmInvoices: ['create', 'read', 'update', 'delete'],
  crmInvoiceItems: ['create', 'read', 'update', 'delete'],
  notifications: ['create', 'read', 'update', 'delete'],
  attachments: ['create', 'read', 'update', 'delete'],
  tags: ['create', 'read', 'update', 'delete'],
  taggings: ['create', 'read', 'update', 'delete'],

  // DMS
  dmsDeliveryRoutes: ['create', 'read', 'update', 'delete'],
  dmsDeliveryTasks: ['create', 'read', 'update', 'delete'],
  dmsTaskEvents: ['create', 'read', 'update', 'delete'],
  dmsProofOfDeliveries: ['create', 'read', 'update', 'delete'],
  dmsDriverLocations: ['create', 'read', 'update', 'delete'],
  dmsCustomerTrackingLinks: ['create', 'read', 'update', 'delete'],

  // IMS
  imsProducts: ['create', 'read', 'update', 'delete'],
  imsSuppliers: ['create', 'read', 'update', 'delete'],
  imsInventoryBatches: ['create', 'read', 'update', 'delete'],
  imsInventoryAdjustments: ['create', 'read', 'update', 'delete'],
  imsReorderPoints: ['create', 'read', 'update', 'delete'],
  imsInboundShipments: ['create', 'read', 'update', 'delete'],
  imsInboundShipmentItems: ['create', 'read', 'update', 'delete'],
  imsStockTransfers: ['create', 'read', 'update', 'delete'],
  imsSalesOrders: ['create', 'read', 'update', 'delete'],
  imsSalesOrderItems: ['create', 'read', 'update', 'delete'],
  imsOutboundShipments: ['create', 'read', 'update', 'delete'],
  imsOutboundShipmentItems: ['create', 'read', 'update', 'delete'],
  imsReturns: ['create', 'read', 'update', 'delete'],
  imsReturnItems: ['create', 'read', 'update', 'delete'],

  // TMS
  tmsDrivers: ['create', 'read', 'update', 'delete'],
  tmsDriverSchedules: ['create', 'read', 'update', 'delete'],
  tmsVehicles: ['create', 'read', 'update', 'delete'],
  tmsVehicleMaintenance: ['create', 'read', 'update', 'delete'],
  tmsTrips: ['create', 'read', 'update', 'delete'],
  tmsTripStops: ['create', 'read', 'update', 'delete'],
  tmsGpsPings: ['create', 'read', 'update', 'delete'],
  tmsRoutes: ['create', 'read', 'update', 'delete'],
  tmsProofOfDeliveries: ['create', 'read', 'update', 'delete'],
  tmsExpenses: ['create', 'read', 'update', 'delete'],
  tmsGeofences: ['create', 'read', 'update', 'delete'],
  tmsGeofenceEvents: ['create', 'read', 'update', 'delete'],
  tmsCarriers: ['create', 'read', 'update', 'delete'],
  tmsCarrierRates: ['create', 'read', 'update', 'delete'],
  tmsShipmentLegs: ['create', 'read', 'update', 'delete'],
  tmsShipmentLegEvents: ['create', 'read', 'update', 'delete'],
  tmsPartnerInvoices: ['create', 'read', 'update', 'delete'],
  tmsPartnerInvoiceItems: ['create', 'read', 'update', 'delete'],

  // WMS
  wmsLocations: ['create', 'read', 'update', 'delete'],
  wmsWarehouses: ['create', 'read', 'update', 'delete'],
  wmsInventoryStock: ['create', 'read', 'update', 'delete'],
  wmsPutawayRules: ['create', 'read', 'update', 'delete'],
  wmsBinThresholds: ['create', 'read', 'update', 'delete'],
  wmsPickBatches: ['create', 'read', 'update', 'delete'],
  wmsPickBatchItems: ['create', 'read', 'update', 'delete'],
  wmsTasks: ['create', 'read', 'update', 'delete'],
  wmsTaskItems: ['create', 'read', 'update', 'delete'],
  wmsPackages: ['create', 'read', 'update', 'delete'],
  wmsPackageItems: ['create', 'read', 'update', 'delete'],
});

export const developer = ac.newRole({
  ...adminAc.statements, // Inherit default admin permissions
  // Auth
  user: ['create', 'read', 'update', 'delete'],
  session: ['create', 'read', 'update', 'delete'],
  account: ['create', 'read', 'update', 'delete'],
  verification: ['create', 'read', 'update', 'delete'],

  // Billing
  billingRateCards: ['create', 'read', 'update', 'delete'],
  billingRateRules: ['create', 'read', 'update', 'delete'],
  billingSurcharges: ['create', 'read', 'update', 'delete'],
  billingQuotes: ['create', 'read', 'update', 'delete'],
  billingClientAccounts: ['create', 'read', 'update', 'delete'],
  billingAccountTransactions: ['create', 'read', 'update', 'delete'],
  billingInvoices: ['create', 'read', 'update', 'delete'],
  billingInvoiceLineItems: ['create', 'read', 'update', 'delete'],
  billingPayments: ['create', 'read', 'update', 'delete'],
  billingDisputes: ['create', 'read', 'update', 'delete'],
  billingCreditNotes: ['create', 'read', 'update', 'delete'],
  billingDocuments: ['create', 'read', 'update', 'delete'],
  billingAccountingSyncLog: ['create', 'read', 'update', 'delete'],

  // CRM
  companies: ['create', 'read', 'update', 'delete'],
  contacts: ['create', 'read', 'update', 'delete'],
  interactions: ['create', 'read', 'update', 'delete'],
  campaigns: ['create', 'read', 'update', 'delete'],
  leads: ['create', 'read', 'update', 'delete'],
  opportunities: ['create', 'read', 'update', 'delete'],
  products: ['create', 'read', 'update', 'delete'],
  opportunityProducts: ['create', 'read', 'update', 'delete'],
  cases: ['create', 'read', 'update', 'delete'],
  crmInvoices: ['create', 'read', 'update', 'delete'],
  crmInvoiceItems: ['create', 'read', 'update', 'delete'],
  notifications: ['create', 'read', 'update', 'delete'],
  attachments: ['create', 'read', 'update', 'delete'],
  tags: ['create', 'read', 'update', 'delete'],
  taggings: ['create', 'read', 'update', 'delete'],

  // DMS
  dmsDeliveryRoutes: ['create', 'read', 'update', 'delete'],
  dmsDeliveryTasks: ['create', 'read', 'update', 'delete'],
  dmsTaskEvents: ['create', 'read', 'update', 'delete'],
  dmsProofOfDeliveries: ['create', 'read', 'update', 'delete'],
  dmsDriverLocations: ['create', 'read', 'update', 'delete'],
  dmsCustomerTrackingLinks: ['create', 'read', 'update', 'delete'],

  // IMS
  imsProducts: ['create', 'read', 'update', 'delete'],
  imsSuppliers: ['create', 'read', 'update', 'delete'],
  imsInventoryBatches: ['create', 'read', 'update', 'delete'],
  imsInventoryAdjustments: ['create', 'read', 'update', 'delete'],
  imsReorderPoints: ['create', 'read', 'update', 'delete'],
  imsInboundShipments: ['create', 'read', 'update', 'delete'],
  imsInboundShipmentItems: ['create', 'read', 'update', 'delete'],
  imsStockTransfers: ['create', 'read', 'update', 'delete'],
  imsSalesOrders: ['create', 'read', 'update', 'delete'],
  imsSalesOrderItems: ['create', 'read', 'update', 'delete'],
  imsOutboundShipments: ['create', 'read', 'update', 'delete'],
  imsOutboundShipmentItems: ['create', 'read', 'update', 'delete'],
  imsReturns: ['create', 'read', 'update', 'delete'],
  imsReturnItems: ['create', 'read', 'update', 'delete'],

  // TMS
  tmsDrivers: ['create', 'read', 'update', 'delete'],
  tmsDriverSchedules: ['create', 'read', 'update', 'delete'],
  tmsVehicles: ['create', 'read', 'update', 'delete'],
  tmsVehicleMaintenance: ['create', 'read', 'update', 'delete'],
  tmsTrips: ['create', 'read', 'update', 'delete'],
  tmsTripStops: ['create', 'read', 'update', 'delete'],
  tmsGpsPings: ['create', 'read', 'update', 'delete'],
  tmsRoutes: ['create', 'read', 'update', 'delete'],
  tmsProofOfDeliveries: ['create', 'read', 'update', 'delete'],
  tmsExpenses: ['create', 'read', 'update', 'delete'],
  tmsGeofences: ['create', 'read', 'update', 'delete'],
  tmsGeofenceEvents: ['create', 'read', 'update', 'delete'],
  tmsCarriers: ['create', 'read', 'update', 'delete'],
  tmsCarrierRates: ['create', 'read', 'update', 'delete'],
  tmsShipmentLegs: ['create', 'read', 'update', 'delete'],
  tmsShipmentLegEvents: ['create', 'read', 'update', 'delete'],
  tmsPartnerInvoices: ['create', 'read', 'update', 'delete'],
  tmsPartnerInvoiceItems: ['create', 'read', 'update', 'delete'],

  // WMS
  wmsLocations: ['create', 'read', 'update', 'delete'],
  wmsWarehouses: ['create', 'read', 'update', 'delete'],
  wmsInventoryStock: ['create', 'read', 'update', 'delete'],
  wmsPutawayRules: ['create', 'read', 'update', 'delete'],
  wmsBinThresholds: ['create', 'read', 'update', 'delete'],
  wmsPickBatches: ['create', 'read', 'update', 'delete'],
  wmsPickBatchItems: ['create', 'read', 'update', 'delete'],
  wmsTasks: ['create', 'read', 'update', 'delete'],
  wmsTaskItems: ['create', 'read', 'update', 'delete'],
  wmsPackages: ['create', 'read', 'update', 'delete'],
  wmsPackageItems: ['create', 'read', 'update', 'delete'],
});

export const clientAdmin = ac.newRole({
  user: ['create', 'read', 'update', 'delete'],
  session: ['read', 'update', 'delete'],
  account: ['read', 'update', 'delete'],
  verification: ['read', 'update', 'delete'],

  billingQuotes: ['create', 'read', 'update', 'delete'],
  billingClientAccounts: ['read', 'update'],
  billingAccountTransactions: ['read'],
  billingInvoices: ['read'],
  billingInvoiceLineItems: ['read'],
  billingPayments: ['create', 'read'],
  billingDisputes: ['create', 'read', 'update'],
  billingCreditNotes: ['read'],
  billingDocuments: ['read'],

  companies: ['read', 'update'],
  contacts: ['read', 'update'],
  interactions: ['read', 'update'],
  leads: ['read', 'update'],
  opportunities: ['read', 'update'],
  cases: ['read', 'update'],
  notifications: ['read', 'update', 'delete'],
  attachments: ['read', 'update'],
  tags: ['read', 'update'],
  taggings: ['read', 'update'],
});

export const user = ac.newRole({
  user: ['read', 'update'],
  session: ['create', 'read', 'update', 'delete'],
  account: ['create', 'read', 'update', 'delete'],
  verification: ['create', 'read', 'update', 'delete'],

  billingQuotes: ['create', 'read'],
  billingClientAccounts: ['read'],
  billingAccountTransactions: ['read'],
  billingInvoices: ['read'],
  billingInvoiceLineItems: ['read'],
  billingPayments: ['create', 'read'],
  billingDisputes: ['create', 'read'],
  billingCreditNotes: ['read'],
  billingDocuments: ['read'],

  notifications: ['read', 'update', 'delete'],
});

export const pricingAnalyst = ac.newRole({
  billingRateCards: ['create', 'read', 'update', 'delete'],
  billingRateRules: ['create', 'read', 'update', 'delete'],
  billingSurcharges: ['create', 'read', 'update', 'delete'],
});

export const accountsManager = ac.newRole({
  billingRateCards: ['read'],
  billingRateRules: ['read'],
  billingSurcharges: ['read'],
  billingQuotes: ['create', 'read', 'update', 'delete'],
  billingClientAccounts: ['create', 'read', 'update', 'delete'],
  billingAccountTransactions: ['create', 'read', 'update', 'delete'],
  billingInvoices: ['create', 'read', 'update', 'delete'],
  billingInvoiceLineItems: ['create', 'read', 'update', 'delete'],
  billingPayments: ['create', 'read', 'update', 'delete'],
  billingDisputes: ['create', 'read', 'update', 'delete'],
  billingCreditNotes: ['create', 'read', 'update', 'delete'],
  billingDocuments: ['create', 'read', 'update', 'delete'],

  companies: ['read'],
  contacts: ['read'],
  opportunities: ['read'],
  crmInvoices: ['create', 'read', 'update', 'delete'],
  crmInvoiceItems: ['create', 'read', 'update', 'delete'],
  attachments: ['read'],

  tmsExpenses: ['read', 'update', 'delete'],
  tmsPartnerInvoices: ['create', 'read', 'update', 'delete'],
  tmsPartnerInvoiceItems: ['create', 'read', 'update', 'delete'],

  imsProducts: ['read'],
  imsReorderPoints: ['create', 'read', 'update', 'delete'],
  imsInboundShipments: ['read'],
  imsSalesOrders: ['create', 'read', 'update', 'delete'],
  imsSalesOrderItems: ['create', 'read', 'update', 'delete'],
  imsReturns: ['create', 'read', 'update', 'delete'],
});

export const financeManager = ac.newRole({
  billingRateCards: ['read'],
  billingRateRules: ['read'],
  billingSurcharges: ['read'],
  billingQuotes: ['read'],
  billingClientAccounts: ['read'],
  billingAccountTransactions: ['read'],
  billingInvoices: ['read'],
  billingInvoiceLineItems: ['read'],
  billingPayments: ['read'],
  billingDisputes: ['read'],
  billingCreditNotes: ['read'],
  billingDocuments: ['read'],
  billingAccountingSyncLog: ['read'],
});

export const salesManager = ac.newRole({
  companies: ['create', 'read', 'update', 'delete'],
  contacts: ['create', 'read', 'update', 'delete'],
  interactions: ['read'],
  campaigns: ['read'],
  leads: ['create', 'read', 'update', 'delete'],
  opportunities: ['create', 'read', 'update', 'delete'],
  products: ['create', 'read', 'update', 'delete'],
  opportunityProducts: ['create', 'read', 'update', 'delete'],
  cases: ['read', 'delete'],
  crmInvoices: ['read'],
  attachments: ['read'],
  tags: ['create', 'read', 'update', 'delete'],
  taggings: ['create', 'read', 'update', 'delete'],

  billingQuotes: ['create', 'read', 'update'],
});

export const client = ac.newRole({
  billingQuotes: ['create', 'read'],
  billingClientAccounts: ['read'],
  billingAccountTransactions: ['read'],
  billingInvoices: ['read'],
  billingInvoiceLineItems: ['read'],
  billingPayments: ['create', 'read'],
  billingDisputes: ['create', 'read'],
  billingCreditNotes: ['read'],
  billingDocuments: ['read'],
});

export const accountant = ac.newRole({
  billingAccountingSyncLog: ['create', 'read', 'update', 'delete'],
});

export const salesRep = ac.newRole({
  companies: ['create', 'read', 'update'],
  contacts: ['create', 'read', 'update'],
  interactions: ['create', 'read', 'update'],
  leads: ['create', 'read', 'update'],
  opportunities: ['create', 'read', 'update'],
  products: ['read'],
  opportunityProducts: ['create', 'read', 'update', 'delete'],
  cases: ['create', 'read', 'update'],
  attachments: ['create', 'read', 'update', 'delete'],
  tags: ['read'],
  taggings: ['create', 'read', 'update', 'delete'],
});

export const customerSupportAgent = ac.newRole({
  companies: ['read'],
  contacts: ['read'],
  interactions: ['create', 'read', 'update'],
  cases: ['create', 'read', 'update'],
  attachments: ['create', 'read', 'update', 'delete'],

  dmsCustomerTrackingLinks: ['read'],
});

export const marketingManager = ac.newRole({
  campaigns: ['create', 'read', 'update', 'delete'],
  leads: ['read'],
});

export const SDR = ac.newRole({
  leads: ['create', 'read', 'update'],
});

export const dispatchManager = ac.newRole({
  dmsDeliveryRoutes: ['create', 'read', 'update', 'delete'],
  dmsDeliveryTasks: ['create', 'read', 'update', 'delete'],
  dmsTaskEvents: ['create', 'read'],
  dmsProofOfDeliveries: ['read'],
  dmsDriverLocations: ['read'],
  dmsCustomerTrackingLinks: ['read'],

  tmsDrivers: ['read'],
  tmsDriverSchedules: ['read'],
  tmsVehicles: ['read'],
  tmsTrips: ['create', 'read', 'update', 'delete'],
  tmsTripStops: ['create', 'read', 'update', 'delete'],
  tmsGpsPings: ['read'],
  tmsRoutes: ['create', 'read', 'update', 'delete'],
  tmsProofOfDeliveries: ['read'],
  tmsGeofences: ['create', 'read', 'update', 'delete'],
  tmsGeofenceEvents: ['read'],
  tmsCarriers: ['read'],
  tmsCarrierRates: ['read'],
  tmsShipmentLegs: ['read'],
  tmsShipmentLegEvents: ['read'],
});

export const routePlanner = ac.newRole({
  dmsDeliveryRoutes: ['create', 'read', 'update'],
  dmsDeliveryTasks: ['create', 'read', 'update'],
  dmsTaskEvents: ['read'],
  dmsProofOfDeliveries: ['read'],
  dmsDriverLocations: ['read'],
});

export const deliveryDriver = ac.newRole({
  dmsDeliveryRoutes: ['read'],
  dmsDeliveryTasks: ['read', 'update'],
  dmsTaskEvents: ['create', 'read'],
  dmsProofOfDeliveries: ['create', 'read'],

  tmsDriverSchedules: ['read'],
  tmsTrips: ['read'],
  tmsTripStops: ['read', 'update'],
  tmsRoutes: ['read'],
  tmsProofOfDeliveries: ['create', 'read'],
  tmsExpenses: ['create', 'read'],
});

export const logisticsCoordinator = ac.newRole({
  dmsDeliveryRoutes: ['read'],
  dmsDeliveryTasks: ['read'],
  dmsTaskEvents: ['read'],
  dmsProofOfDeliveries: ['read'],
  dmsDriverLocations: ['read'],
  dmsCustomerTrackingLinks: ['read'],

  billingDocuments: ['create', 'read', 'update', 'delete'],

  imsProducts: ['read'],
  imsInboundShipments: ['read'],
  imsStockTransfers: ['create', 'read', 'update', 'delete'],

  tmsCarriers: ['read'],
  tmsCarrierRates: ['read'],
  tmsShipmentLegs: ['read'],
  tmsShipmentLegEvents: ['read'],
});

export const inventoryManager = ac.newRole({
  imsProducts: ['create', 'read', 'update', 'delete'],
  imsSuppliers: ['create', 'read', 'update', 'delete'],
  imsInventoryBatches: ['create', 'read', 'update', 'delete'],
  imsInventoryAdjustments: ['create', 'read', 'update', 'delete'],
  imsReorderPoints: ['create', 'read', 'update', 'delete'],
  imsInboundShipments: ['read'],
  imsInboundShipmentItems: ['read'],
  imsStockTransfers: ['read'],
  imsSalesOrders: ['read'],
  imsSalesOrderItems: ['read'],
  imsOutboundShipments: ['read'],
  imsOutboundShipmentItems: ['read'],
  imsReturns: ['read'],
  imsReturnItems: ['read'],
});

export const warehouseManager = ac.newRole({
  imsProducts: ['read'],
  imsSuppliers: ['read'],
  imsInventoryBatches: ['read'],
  imsInventoryAdjustments: ['read'],
  imsInboundShipments: ['create', 'read', 'update', 'delete'],
  imsInboundShipmentItems: ['read'],
  imsStockTransfers: ['create', 'read', 'update', 'delete'],
  imsSalesOrders: ['read'],
  imsSalesOrderItems: ['read'],
  imsOutboundShipments: ['create', 'read', 'update', 'delete'],
  imsOutboundShipmentItems: ['read'],
  imsReturns: ['read'],
  imsReturnItems: ['read'],

  wmsLocations: ['create', 'read', 'update', 'delete'],
  wmsWarehouses: ['create', 'read', 'update', 'delete'],
  wmsInventoryStock: ['read', 'update'],
  wmsPutawayRules: ['create', 'read', 'update', 'delete'],
  wmsBinThresholds: ['create', 'read', 'update', 'delete'],
  wmsPickBatches: ['create', 'read', 'update', 'delete'],
  wmsPickBatchItems: ['create', 'read', 'update', 'delete'],
  wmsTasks: ['create', 'read', 'update', 'delete'],
  wmsTaskItems: ['create', 'read', 'update', 'delete'],
  wmsPackages: ['read'],
  wmsPackageItems: ['read'],
});

export const warehouseOperator = ac.newRole({
  imsProducts: ['read'],
  imsInventoryBatches: ['read'],
  imsInventoryAdjustments: ['create', 'read', 'update'],
  imsInboundShipmentItems: ['create', 'read', 'update', 'delete'],
  imsSalesOrders: ['read'],
  imsSalesOrderItems: ['read'],
  imsOutboundShipments: ['read'],
  imsOutboundShipmentItems: ['create', 'read', 'update', 'delete'],
  imsReturns: ['create', 'read', 'update', 'delete'],
  imsReturnItems: ['create', 'read', 'update', 'delete'],

  wmsLocations: ['read'],
  wmsInventoryStock: ['read', 'update'],
  wmsTasks: ['read', 'update'],
  wmsTaskItems: ['read', 'update'],
});

export const qualityControlManager = ac.newRole({
  imsInventoryBatches: ['create', 'read', 'update', 'delete'],
});

export const receivingManager = ac.newRole({
  imsInboundShipments: ['create', 'read', 'update', 'delete'],
  imsInboundShipmentItems: ['create', 'read', 'update', 'delete'],
});

export const transportManager = ac.newRole({
  tmsDrivers: ['create', 'read', 'update', 'delete'],
  tmsDriverSchedules: ['create', 'read', 'update', 'delete'],
  tmsVehicles: ['read'],
  tmsVehicleMaintenance: ['read'],
  tmsTrips: ['read'],
  tmsTripStops: ['read'],
  tmsGpsPings: ['read'],
  tmsRoutes: ['create', 'read', 'update', 'delete'],
  tmsProofOfDeliveries: ['read'],
  tmsExpenses: ['read', 'update', 'delete'],
  tmsGeofences: ['read'],
  tmsGeofenceEvents: ['read'],
  tmsCarriers: ['read'],
  tmsCarrierRates: ['read'],
  tmsShipmentLegs: ['read'],
  tmsShipmentLegEvents: ['read'],
});

export const fleetManager = ac.newRole({
  tmsDrivers: ['read'],
  tmsDriverSchedules: ['read'],
  tmsVehicles: ['create', 'read', 'update', 'delete'],
  tmsVehicleMaintenance: ['create', 'read', 'update', 'delete'],
  tmsTrips: ['read'],
  tmsTripStops: ['read'],
  tmsGpsPings: ['read'],
});

export const dispatcher = ac.newRole({
  tmsDrivers: ['read'],
  tmsDriverSchedules: ['read'],
  tmsVehicles: ['read'],
  tmsTrips: ['create', 'read', 'update', 'delete'],
  tmsTripStops: ['create', 'read', 'update', 'delete'],
  tmsGpsPings: ['read'],
  tmsRoutes: ['create', 'read', 'update', 'delete'],
  tmsProofOfDeliveries: ['read'],
  tmsGeofences: ['create', 'read', 'update', 'delete'],
  tmsGeofenceEvents: ['read'],
  tmsCarriers: ['read'],
  tmsCarrierRates: ['read'],
  tmsShipmentLegs: ['read'],
  tmsShipmentLegEvents: ['read'],
});

export const driver = ac.newRole({
  tmsDriverSchedules: ['read'],
  tmsTrips: ['read'],
  tmsTripStops: ['read', 'update'],
  tmsRoutes: ['read'],
  tmsProofOfDeliveries: ['create', 'read'],
  tmsExpenses: ['create', 'read'],
});

export const logisticsManager = ac.newRole({
  tmsCarriers: ['create', 'read', 'update', 'delete'],
  tmsCarrierRates: ['create', 'read', 'update', 'delete'],
  tmsPartnerInvoices: ['read'],
  tmsPartnerInvoiceItems: ['read'],
});

export const logisticsPlanner = ac.newRole({
  tmsCarriers: ['read'],
  tmsCarrierRates: ['read'],
  tmsShipmentLegs: ['create', 'read', 'update', 'delete'],
  tmsShipmentLegEvents: ['read'],
});

export const supervisor = ac.newRole({
  wmsLocations: ['read'],
  wmsWarehouses: ['read'],
  wmsInventoryStock: ['read'],
  wmsPutawayRules: ['read'],
  wmsBinThresholds: ['read'],
  wmsPickBatches: ['read'],
  wmsPickBatchItems: ['read'],
  wmsTasks: ['read'],
  wmsTaskItems: ['read'],
  wmsPackages: ['read'],
  wmsPackageItems: ['read'],
});

export const picker = ac.newRole({
  wmsInventoryStock: ['read'],
  wmsPickBatches: ['read'],
  wmsPickBatchItems: ['read'],
  wmsTasks: ['read', 'update'],
  wmsTaskItems: ['read', 'update'],
});

export const packer = ac.newRole({
  wmsInventoryStock: ['read'],
  wmsTasks: ['read', 'update'],
  wmsTaskItems: ['read', 'update'],
  wmsPackages: ['create', 'read', 'update', 'delete'],
  wmsPackageItems: ['create', 'read', 'update', 'delete'],
});

export const AllRoles = z.enum([
  'admin',
  'developer',
  'clientAdmin',
  'user',
  'pricingAnalyst',
  'accountsManager',
  'financeManager',
  'salesManager',
  'client',
  'accountant',
  'salesRep',
  'customerSupportAgent',
  'marketingManager',
  'SDR',
  'dispatchManager',
  'routePlanner',
  'deliveryDriver',
  'logisticsCoordinator',
  'inventoryManager',
  'warehouseManager',
  'warehouseOperator',
  'qualityControlManager',
  'receivingManager',
  'transportManager',
  'fleetManager',
  'dispatcher',
  'driver',
  'logisticsManager',
  'logisticsPlanner',
  'supervisor',
  'picker',
  'packer',
]);
