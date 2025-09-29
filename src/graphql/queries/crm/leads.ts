import { graphql } from "@/lib/graphql/client";

export const getLead = graphql(`
  query GetLead($id: UUID!) {
    crm {
      lead(id: $id) {
        id
        name
        email
        leadSource
        status
        leadScore
        convertedAt
        createdAt
        updatedAt
        owner {
          id
          name
        }
        campaign {
          id
          name
        }
        convertedContact {
          id
          name
        }
        convertedOpportunity {
          id
          name
        }
      }
    }
  }
`);

export const getLeads = graphql(`
  query GetLeads($limit: Int!, $page: Int!) {
    crm {
      leads(limit: $limit, page: $page) {
        id
        name
        email
        leadSource
        status
        leadScore
        createdAt
        updatedAt
        owner {
          id
          name
        }
      }
    }
  }
`);