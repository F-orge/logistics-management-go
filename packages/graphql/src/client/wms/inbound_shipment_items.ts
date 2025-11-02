import { graphql } from "../generated/gql";

// export const CreateInboundShipmentItemMutation = graphql(`
//   mutation CreateInboundShipmentItem(
//     $inboundShipmentItem: CreateInboundShipmentItemInput!
//   ) {
//     wms {
//       createInboundShipmentItem(value: $inboundShipmentItem) {
//         id
//         expectedQuantity
//         receivedQuantity
//         discrepancyQuantity
//         discrepancyNotes
//         createdAt
//         updatedAt
//       }
//     }
//   }
// `);

export const UpdateInboundShipmentItemMutation = graphql(`
  mutation UpdateInboundShipmentItem(
    $id: ID!
    $inboundShipmentItem: UpdateInboundShipmentItemInput!
  ) {
    wms {
      updateInboundShipmentItem(id: $id, value: $inboundShipmentItem) {
        id
        expectedQuantity
        receivedQuantity
        discrepancyQuantity
        discrepancyNotes
        createdAt
        updatedAt
      }
    }
  }
`);

export const RemoveInboundShipmentItemMutation = graphql(`
  mutation RemoveInboundShipmentItem($id: ID!) {
    wms {
      removeInboundShipmentItem(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
