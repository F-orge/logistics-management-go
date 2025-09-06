import signIn from './auth/sign-in';
import signOut from './auth/sign-out';
import signUp from './auth/sign-up';
import * as crmCampaigns from './crm/campaigns';
import * as crmCases from './crm/cases';
import * as crmCompanies from './crm/companies';
import * as crmContacts from './crm/contacts';
import * as crmInteractions from './crm/interactions';
import * as crmLeads from './crm/leads';
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
  },
};
