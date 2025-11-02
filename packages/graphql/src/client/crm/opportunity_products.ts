import { graphql } from "../generated/gql";

export const AddOpportunityProductMutation = graphql(`
  mutation AddOpportunityProduct(
    $id: ID!
    $opportunityProduct: AddOpportunityProductInput!
  ) {
    crm {
      addOpportunityProduct(id: $id, value: $opportunityProduct) {
        opportunity {
          id
        }
        product {
          id
        }
      }
    }
  }
`);

export const UpdateOpportunityProductMutation = graphql(`
  mutation UpdateOpportunityProduct(
    $id: ID!
    $opportunityProduct: UpdateOpportunityProductInput!
  ) {
    crm {
      updateOpportunityProduct(id: $id, value: $opportunityProduct) {
        opportunity {
          id
        }
        product {
          id
        }
      }
    }
  }
`);

export const RemoveOpportunityProductMutation = graphql(`
  mutation RemoveOpportunityProduct($id: ID!) {
    crm {
      removeOpportunityProduct(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
