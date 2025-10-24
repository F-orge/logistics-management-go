import { graphql } from "../generated/gql";

export const CreatePutawayRuleMutation = graphql(`
  mutation CreatePutawayRule($putawayRule: CreatePutawayRuleInput!) {
    wms {
      createPutawayRule(value: $putawayRule) {
        id
      }
    }
  }
`);

export const UpdatePutawayRuleMutation = graphql(`
  mutation UpdatePutawayRule($id: ID!, $putawayRule: UpdatePutawayRuleInput!) {
    wms {
      updatePutawayRule(id: $id, value: $putawayRule) {
        id
      }
    }
  }
`);

export const RemovePutawayRuleMutation = graphql(`
  mutation RemovePutawayRule($id: ID!) {
    wms {
      removePutawayRule(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
