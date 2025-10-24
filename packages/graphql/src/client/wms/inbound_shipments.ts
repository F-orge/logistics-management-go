import { graphql } from "../../generated/gql";

export const CreateInboundShipmentMutation = graphql(`
  mutation CreateInboundShipment($inboundShipment: CreateInboundShipmentInput!) {
    wms {
      createInboundShipment(value: $inboundShipment) {
        id
      }
    }
  }
`);

export const UpdateInboundShipmentMutation = graphql(`
  mutation UpdateInboundShipment($id: ID!, $inboundShipment: UpdateInboundShipmentInput!) {
    wms {
      updateInboundShipment(id: $id, value: $inboundShipment) {
        id
      }
    }
  }
`);

export const RemoveInboundShipmentMutation = graphql(`
  mutation RemoveInboundShipment($id: ID!) {
    wms {
      removeInboundShipment(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
