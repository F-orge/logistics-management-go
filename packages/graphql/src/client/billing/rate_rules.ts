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

export const SearchRateRulesQuery = graphql(`
  query SearchRateRules($search: String!) {
    billing {
      rateRules(search: $search, page: 1, perPage: 10) {
        value: id
        label: condition
      }
    }
  }
`);

export const AnalyticsRateRulesQuery = graphql(`
  query AnalyticsRateRules($from: Date, $to: Date) {
    billing {
      rateRules(from: $from, to: $to) {
        price
        minValue
        maxValue
        priority
        pricingModel
      }
    }
  }
`);
