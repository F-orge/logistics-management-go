import { graphql } from "@/lib/graphql/client";

export const getCase = graphql(`
  query GetCase($id: UUID!) {
    crm {
      case(id: $id) {
        id
        caseNumber
        description
        status
        priority
        type
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
      }
    }
  }
`);

export const getCases = graphql(`
  query GetCases($limit: Int!, $page: Int!) {
    crm {
      cases(limit: $limit, page: $page) {
        id
        caseNumber
        description
        status
        priority
        type
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
      }
    }
  }
`);
