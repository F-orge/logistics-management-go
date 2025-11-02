import { graphql } from "../generated/gql";

export const CreateShipmentLegEventMutation = graphql(`
  mutation CreateShipmentLegEvent(
    $shipmentLegEvent: CreateShipmentLegEventInput!
  ) {
    tms {
      createShipmentLegEvent(value: $shipmentLegEvent) {
        id
      }
    }
  }
`);

// export const UpdateShipmentLegEventMutation = graphql(`
//   mutation UpdateShipmentLegEvent(
//     $id: ID!
//     $shipmentLegEvent: UpdateShipmentLegEventInput!
//   ) {
//     tms {
//       updateShipmentLegEvent(id: $id, value: $shipmentLegEvent) {
//         id
//       }
//     }
//   }
// `);

// export const RemoveShipmentLegEventMutation = graphql(`
//   mutation RemoveShipmentLegEvent($id: ID!) {
//     tms {
//       removeShipmentLegEvent(id: $id) {
//         success
//         numDeletedRows
//       }
//     }
//   }
// `);
