import { graphql } from "../generated/gql";

// export const CreateOpportunityProductMutation = graphql(`
//   mutation CreateOpportunityProduct(
//     $opportunityProduct: CreateOpportunityProductInput!
//   ) {
//     crm {
//       createOpportunityProduct(value: $opportunityProduct) {
//         opportunity {
//           id
//         }
//         product {
//           id
//         }
//       }
//     }
//   }
// `);

export const UpdateOpportunityProductMutation = graphql(`
  mutation UpdateOpportunityProduct(
    $opportunityId: ID!
    $productId: ID!
    $opportunityProduct: UpdateOpportunityProductInput!
  ) {
    crm {
      updateOpportunityProduct(
        opportunityId: $opportunityId
        productId: $productId
        value: $opportunityProduct
      ) {
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
  mutation RemoveOpportunityProduct($opportunityId: ID!, $productId: ID!) {
    crm {
      removeOpportunityProduct(
        opportunityId: $opportunityId
        productId: $productId
      ) {
        success
        numDeletedRows
      }
    }
  }
`);
