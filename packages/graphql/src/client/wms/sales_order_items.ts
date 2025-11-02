import { graphql } from "../generated/gql";

// export const CreateSalesOrderItemMutation = graphql(`
//   mutation CreateSalesOrderItem($salesOrderItem: CreateSalesOrderItemInput!) {
//     wms {
//       createSalesOrderItem(value: $salesOrderItem) {
//         id
//         quantityOrdered
//         createdAt
//         updatedAt
//       }
//     }
//   }
// `);

export const UpdateSalesOrderItemMutation = graphql(`
  mutation UpdateSalesOrderItem(
    $id: ID!
    $salesOrderItem: UpdateSalesOrderItemInput!
  ) {
    wms {
      updateSalesOrderItem(id: $id, value: $salesOrderItem) {
        id
        quantityOrdered
        createdAt
        updatedAt
      }
    }
  }
`);

export const RemoveSalesOrderItemMutation = graphql(`
  mutation RemoveSalesOrderItem($id: ID!) {
    wms {
      removeSalesOrderItem(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
