import * as crmCampaigns from './crm/campaigns';
import * as crmCases from './crm/cases';
import * as crmCompanies from './crm/companies';
import * as crmContacts from './crm/contacts';
import * as crmInteractions from './crm/interactions';
import * as crmInvoices from './crm/invoices';
import * as crmLeads from './crm/leads';
import * as crmOpportunities from './crm/opportunities';
import * as crmProducts from './crm/products';
import health from './health';

export default {
  health,
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
};
