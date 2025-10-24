import { graphql } from "../../generated/gql";

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
