import signIn from './auth/sign-in';
import signOut from './auth/sign-out';
import signUp from './auth/sign-up';
import * as crmCampaigns from './crm/campaigns';
import * as crmCases from './crm/cases';
import * as crmCompanies from './crm/companies';
import * as crmContacts from './crm/contacts';
import * as crmInteractions from './crm/interactions';
import * as crmInvoices from './crm/invoices';
import * as crmLeads from './crm/leads';
import * as crmOpportunities from './crm/opportunities';
import * as crmProducts from './crm/products';
import * as imsProducts from './ims/products';
import * as imsInventoryLevel from './ims/inventory_levels';
import * as wmsWarehouse from './wms/warehouse';
import * as wmsLocations from './wms/locations';
import health from './health';

export default {
  health,
  auth: {
    signIn,
    signUp,
    signOut,
  },
  crm: {
    campaigns: crmCampaigns,
    cases: crmCases,
    companies: crmCompanies,
    contacts: crmContacts,
    interactions: crmInteractions,
    leads: crmLeads,
    products: crmProducts,
    opportunities: crmOpportunities,
    invoices: crmInvoices,
  },
  ims: {
    products: imsProducts,
    inventoryLevel: imsInventoryLevel,
  },
  wms: {
    warehouse: wmsWarehouse,
    locations: wmsLocations,
  },
};
