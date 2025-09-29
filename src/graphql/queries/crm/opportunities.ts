import { graphql } from "@/lib/graphql/client";

export const getOpportunity = graphql(`
  query GetOpportunity($id: UUID!) {
    crm {
      opportunity(id: $id) {
        id
        name
        stage
        dealValue
        probability
        expectedCloseDate
        lostReason
        source
        createdAt
        updatedAt
        owner {
          id
          name
        }
        contact {
          id
          name
        }
        company {
          id
          name
        }
        campaign {
          id
          name
        }
        products(limit: 10, page: 1) {
          id
          name
        }
      }
    }
  }
`);

export const getOpportunities = graphql(`
  query GetOpportunities($limit: Int!, $page: Int!) {
    crm {
      opportunities(limit: $limit, page: $page) {
        id
        name
        stage
        dealValue
        probability
        expectedCloseDate
        source
        createdAt
        updatedAt
        owner {
          id
          name
        }
        company {
          id
          name
        }
      }
    }
  }
`);