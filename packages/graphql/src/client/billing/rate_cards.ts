import { graphql } from "../../generated/gql";

export const CreateRateCardMutation = graphql(`
  mutation CreateRateCard($rateCard: CreateRateCardInput!) {
    billing {
      createRateCard(value: $rateCard) {
        id
      }
    }
  }
`);

export const UpdateRateCardMutation = graphql(`
  mutation UpdateRateCard($id: ID!, $rateCard: UpdateRateCardInput!) {
    billing {
      updateRateCard(id: $id, value: $rateCard) {
        id
      }
    }
  }
`);

export const RemoveRateCardMutation = graphql(`
  mutation RemoveRateCard($id: ID!) {
    billing {
      removeRateCard(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
