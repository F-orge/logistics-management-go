import { graphql } from "../generated/gql";

export const CreateOutboundShipmentMutation = graphql(`
  mutation CreateOutboundShipment(
    $outboundShipment: CreateOutboundShipmentInput!
  ) {
    wms {
      createOutboundShipment(value: $outboundShipment) {
        id
      }
    }
  }
`);

export const UpdateOutboundShipmentMutation = graphql(`
  mutation UpdateOutboundShipment(
    $id: ID!
    $outboundShipment: UpdateOutboundShipmentInput!
  ) {
    wms {
      updateOutboundShipment(id: $id, value: $outboundShipment) {
        id
      }
    }
  }
`);

export const RemoveOutboundShipmentMutation = graphql(`
  mutation RemoveOutboundShipment($id: ID!) {
    wms {
      removeOutboundShipment(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
