import { graphql } from "@/lib/graphql/client";

export const getInteraction = graphql(`
  query GetInteraction($id: UUID!) {
    crm {
      interaction(id: $id) {
        id
        interactionDate
        notes
        outcome
        type
        createdAt
        updatedAt
        user {
          id
          name
        }
        contact {
          id
          name
        }
        case {
          id
          caseNumber
        }
      }
    }
  }
`);

export const getInteractions = graphql(`
  query GetInteractions($limit: Int!, $page: Int!) {
    crm {
      interactions(limit: $limit, page: $page) {
        id
        interactionDate
        notes
        outcome
        type
        createdAt
        updatedAt
        user {
          id
          name
        }
        contact {
          id
          name
        }
        case {
          id
          caseNumber
        }
      }
    }
  }
`);
