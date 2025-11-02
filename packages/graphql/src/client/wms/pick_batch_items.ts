import { graphql } from "../generated/gql";

// export const CreatePickBatchItemMutation = graphql(`
//   mutation CreatePickBatchItem($pickBatchItem: CreatePickBatchItemInput!) {
//     wms {
//       createPickBatchItem(value: $pickBatchItem) {
//         id
//         orderPriority
//         estimatedPickTime
//         actualPickTime
//         createdAt
//         updatedAt
//       }
//     }
//   }
// `);

export const UpdatePickBatchItemMutation = graphql(`
  mutation UpdatePickBatchItem(
    $id: ID!
    $pickBatchItem: UpdatePickBatchItemInput!
  ) {
    wms {
      updatePickBatchItem(id: $id, value: $pickBatchItem) {
        id
        orderPriority
        estimatedPickTime
        actualPickTime
        createdAt
        updatedAt
      }
    }
  }
`);

export const RemovePickBatchItemMutation = graphql(`
  mutation RemovePickBatchItem($id: ID!) {
    wms {
      removePickBatchItem(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
