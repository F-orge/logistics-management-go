import { graphql } from '@/lib/graphql/client';

// CRM Queries: id only
export const attachment = graphql(`
  query CrmAttachment($id: UUID!) {
    crm {
      attachment(id: $id) {
        id
      }
    }
  }
`);

export const attachments = graphql(`
  query CrmAttachments($limit: Int!, $page: Int!) {
    crm {
      attachments(limit: $limit, page: $page) {
        id
      }
    }
  }
`);

export const campaign = graphql(`
  query CrmCampaign($id: UUID!) {
    crm {
      campaign(id: $id) {
        id
      }
    }
  }
`);

export const campaigns = graphql(`
  query CrmCampaigns($limit: Int!, $page: Int!) {
    crm {
      campaigns(limit: $limit, page: $page) {
        id
      }
    }
  }
`);

export const case_ = graphql(`
  query CrmCase($id: UUID!) {
    crm {
      case(id: $id) {
        id
      }
    }
  }
`);

export const cases = graphql(`
  query CrmCases($limit: Int!, $page: Int!) {
    crm {
      cases(limit: $limit, page: $page) {
        id
      }
    }
  }
`);

export const companies = graphql(`
  query CrmCompanies($limit: Int!, $page: Int!) {
    crm {
      companies(limit: $limit, page: $page) {
        id
      }
    }
  }
`);

export const company = graphql(`
  query CrmCompany($id: UUID!) {
    crm {
      company(id: $id) {
        id
      }
    }
  }
`);

export const contact = graphql(`
  query CrmContact($id: UUID!) {
    crm {
      contact(id: $id) {
        id
      }
    }
  }
`);

export const contacts = graphql(`
  query CrmContacts($limit: Int!, $page: Int!) {
    crm {
      contacts(limit: $limit, page: $page) {
        id
      }
    }
  }
`);

export const interaction = graphql(`
  query CrmInteraction($id: UUID!) {
    crm {
      interaction(id: $id) {
        id
      }
    }
  }
`);

export const interactions = graphql(`
  query CrmInteractions($limit: Int!, $page: Int!) {
    crm {
      interactions(limit: $limit, page: $page) {
        id
      }
    }
  }
`);

export const invoice = graphql(`
  query CrmInvoice($id: UUID!) {
    crm {
      invoice(id: $id) {
        id
      }
    }
  }
`);

export const invoices = graphql(`
  query CrmInvoices($limit: Int!, $page: Int!) {
    crm {
      invoices(limit: $limit, page: $page) {
        id
      }
    }
  }
`);

export const lead = graphql(`
  query CrmLead($id: UUID!) {
    crm {
      lead(id: $id) {
        id
      }
    }
  }
`);

export const leads = graphql(`
  query CrmLeads($limit: Int!, $page: Int!) {
    crm {
      leads(limit: $limit, page: $page) {
        id
      }
    }
  }
`);

export const notification = graphql(`
  query CrmNotification($id: UUID!) {
    crm {
      notification(id: $id) {
        id
      }
    }
  }
`);

export const notifications = graphql(`
  query CrmNotifications($limit: Int!, $page: Int!) {
    crm {
      notifications(limit: $limit, page: $page) {
        id
      }
    }
  }
`);

export const opportunities = graphql(`
  query CrmOpportunities($limit: Int!, $page: Int!) {
    crm {
      opportunities(limit: $limit, page: $page) {
        id
      }
    }
  }
`);

export const opportunity = graphql(`
  query CrmOpportunity($id: UUID!) {
    crm {
      opportunity(id: $id) {
        id
      }
    }
  }
`);

export const product = graphql(`
  query CrmProduct($id: UUID!) {
    crm {
      product(id: $id) {
        id
      }
    }
  }
`);

export const products = graphql(`
  query CrmProducts($limit: Int!, $page: Int!) {
    crm {
      products(limit: $limit, page: $page) {
        id
      }
    }
  }
`);

export const tag = graphql(`
  query CrmTag($id: UUID!) {
    crm {
      tag(id: $id) {
        id
      }
    }
  }
`);

export const tags = graphql(`
  query CrmTags($limit: Int!, $page: Int!) {
    crm {
      tags(limit: $limit, page: $page) {
        id
      }
    }
  }
`);
