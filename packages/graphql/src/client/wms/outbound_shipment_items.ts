import { graphql } from "../generated/gql";

// export const CreateOutboundShipmentItemMutation = graphql(`
//   mutation CreateOutboundShipmentItem(
//     $outboundShipmentItem: CreateOutboundShipmentItemInput!
//   ) {
//     wms {
//       createOutboundShipmentItem(value: $outboundShipmentItem) {
//         id
//       }
//     }
//   }
// `);

export const UpdateOutboundShipmentItemMutation = graphql(`
  mutation UpdateOutboundShipmentItem(
    $id: ID!
    $outboundShipmentItem: UpdateOutboundShipmentItemInput!
  ) {
    wms {
      updateOutboundShipmentItem(id: $id, value: $outboundShipmentItem) {
        id
      }
    }
  }
`);

export const RemoveOutboundShipmentItemMutation = graphql(`
  mutation RemoveOutboundShipmentItem($id: ID!) {
    wms {
      removeOutboundShipmentItem(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
