import { graphql } from "../generated/gql";

export const CreateOpportunityMutation = graphql(`
  mutation CreateOpportunity($opportunity: CreateOpportunityInput!) {
    crm {
      createOpportunity(value: $opportunity) {
        id
      }
    }
  }
`);

export const UpdateOpportunityMutation = graphql(`
  mutation UpdateOpportunity($id: ID!, $opportunity: UpdateOpportunityInput!) {
    crm {
      updateOpportunity(id: $id, value: $opportunity) {
        id
      }
    }
  }
`);

export const RemoveOpportunityMutation = graphql(`
  mutation RemoveOpportunity($id: ID!) {
    crm {
      removeOpportunity(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
