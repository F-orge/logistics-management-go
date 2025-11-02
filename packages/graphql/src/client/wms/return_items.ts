import { graphql } from "../generated/gql";

// export const CreateReturnItemMutation = graphql(`
//   mutation CreateReturnItem($returnItem: CreateReturnItemInput!) {
//     wms {
//       createReturnItem(value: $returnItem) {
//         id
//         quantityExpected
//         quantityReceived
//         quantityVariance
//         condition
//         createdAt
//         updatedAt
//       }
//     }
//   }
// `);

export const UpdateReturnItemMutation = graphql(`
  mutation UpdateReturnItem($id: ID!, $returnItem: UpdateReturnItemInput!) {
    wms {
      updateReturnItem(id: $id, value: $returnItem) {
        id
        quantityExpected
        quantityReceived
        quantityVariance
        condition
        createdAt
        updatedAt
      }
    }
  }
`);

export const RemoveReturnItemMutation = graphql(`
  mutation RemoveReturnItem($id: ID!) {
    wms {
      removeReturnItem(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
