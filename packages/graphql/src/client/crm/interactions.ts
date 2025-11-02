import { graphql } from "../generated/gql";

export const CreateInteractionMutation = graphql(`
  mutation CreateInteraction($interaction: CreateInteractionInput!) {
    crm {
      createInteraction(value: $interaction) {
        id
        type
        notes
        outcome
        interactionDate
        createdAt
        updatedAt
      }
    }
  }
`);

export const UpdateInteractionMutation = graphql(`
  mutation UpdateInteraction($id: ID!, $interaction: UpdateInteractionInput!) {
    crm {
      updateInteraction(id: $id, value: $interaction) {
        id
        type
        notes
        outcome
        interactionDate
        updatedAt
        contact {
          id
          name
          email
        }
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

export const SearchInteractionsQuery = graphql(`
  query SearchInteractions($search: String!) {
    crm {
      interactions(page: 1, perPage: 10, search: $search) {
        value: id
        label: outcome
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
