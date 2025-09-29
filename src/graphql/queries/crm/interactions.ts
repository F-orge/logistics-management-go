import { graphql } from "@/lib/graphql/client";

export const getInteraction = graphql(`
  query GetInteraction($id: UUID!) {
    crm {
      interaction(id: $id) {
        id
        type
        outcome
        notes
        interactionDate
        createdAt
        updatedAt
        contact {
          id
          name
        }
        user {
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
        type
        outcome
        notes
        interactionDate
        createdAt
        updatedAt
        contact {
          id
          name
        }
        user {
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