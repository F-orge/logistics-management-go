import { graphql } from "../generated/gql";

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

export const TableRateCardQuery = graphql(`
  query TableRateCard(
    $page: Int
    $perPage: Int
    $search: String
    $serviceType: ServiceType
  ) {
    billing {
      rateCards(
        page: $page
        perPage: $perPage
        search: $search
        serviceType: $serviceType
      ) {
        createdAt
        description
        id
        isActive
        name
        serviceType
        updatedAt
        validFrom
        validTo
        createdByUser {
          email
          emailVerified
          image
          name
        }
        rules {
          condition
          id
          isActive
          maxValue
          minValue
          price
          pricingModel
          priority
          value
        }
      }
    }
  }
`);
