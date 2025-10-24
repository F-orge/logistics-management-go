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
