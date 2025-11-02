import { graphql } from "../generated/gql";

// export const CreateTaskItemMutation = graphql(`
//   mutation CreateTaskItem($taskItem: CreateTaskItemInput!) {
//     wms {
//       createTaskItem(value: $taskItem) {
//         id
//         quantityRequired
//         quantityCompleted
//         quantityRemaining
//         status
//         lotNumber
//         serialNumbers
//         expiryDate
//         notes
//         completedAt
//         createdAt
//         updatedAt
//       }
//     }
//   }
// `);

export const UpdateTaskItemMutation = graphql(`
  mutation UpdateTaskItem($id: ID!, $taskItem: UpdateTaskItemInput!) {
    wms {
      updateTaskItem(id: $id, value: $taskItem) {
        id
        quantityRequired
        quantityCompleted
        quantityRemaining
        status
        lotNumber
        serialNumbers
        expiryDate
        notes
        completedAt
        createdAt
        updatedAt
      }
    }
  }
`);

export const RemoveTaskItemMutation = graphql(`
  mutation RemoveTaskItem($id: ID!) {
    wms {
      removeTaskItem(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
