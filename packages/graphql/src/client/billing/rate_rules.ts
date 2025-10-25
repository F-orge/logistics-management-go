import { graphql } from "../generated/gql";

export const CreateRateRuleMutation = graphql(`
  mutation CreateRateRule($rateRule: CreateRateRuleInput!) {
    billing {
      createRateRule(value: $rateRule) {
        id
      }
    }
  }
`);

export const UpdateRateRuleMutation = graphql(`
  mutation UpdateRateRule($id: ID!, $rateRule: UpdateRateRuleInput!) {
    billing {
      updateRateRule(id: $id, value: $rateRule) {
        id
      }
    }
  }
`);

export const RemoveRateRuleMutation = graphql(`
  mutation RemoveRateRule($id: ID!) {
    billing {
      removeRateRule(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableRateRuleQuery = graphql(`
  query TableRateRule(
    $page: Int
    $perPage: Int
    $pricingModel: PricingModel
    $search: String
  ) {
    billing {
      rateRules(
        page: $page
        perPage: $perPage
        pricingModel: $pricingModel
        search: $search
      ) {
        condition
        createdAt
        id
        isActive
        maxValue
        minValue
        price
        pricingModel
        priority
        updatedAt
        value
        rateCard {
          createdAt
          createdByUser {
            email
            id
            image
            name
          }
          description
          id
          isActive
          name
          serviceType
          updatedAt
          validFrom
          validTo
        }
      }
    }
  }
`);
