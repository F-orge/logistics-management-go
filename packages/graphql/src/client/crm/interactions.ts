import { graphql } from "../generated/gql";

export const CreateInteractionMutation = graphql(`
  mutation CreateInteraction($interaction: CreateInteractionInput!) {
    crm {
      createInteraction(value: $interaction) {
        id
      }
    }
  }
`);

export const UpdateInteractionMutation = graphql(`
  mutation UpdateInteraction($id: ID!, $interaction: UpdateInteractionInput!) {
    crm {
      updateInteraction(id: $id, value: $interaction) {
        id
      }
    }
  }
`);

export const RemoveInteractionMutation = graphql(`
  mutation RemoveInteraction($id: ID!) {
    crm {
      removeInteraction(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableInteractionQuery = graphql(`
  query TableInteraction(
    $page: Int
    $perPage: Int
    $interactionType: InteractionType
    $search: String
  ) {
    crm {
      interactions(
        interactionType: $interactionType
        page: $page
        perPage: $perPage
        search: $search
      ) {
        createdAt
        id
        interactionDate
        notes
        outcome
        type
        updatedAt
        user {
          id
          email
          image
          name
        }
        case {
          id
          caseNumber
          priority
          status
          type
        }
        contact {
          id
          name
          email
          jobTitle
          phoneNumber
        }
      }
    }
  }
`);

export const AnalyticsInteractionsQuery = graphql(`
  query AnalyticsInteractions($from: Date, $to: Date) {
    crm {
      interactions(from: $from, to: $to) {
        type
      }
    }
  }
`);
