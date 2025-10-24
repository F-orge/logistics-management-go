import { graphql } from "../generated/gql";

export const CreateShipmentLegMutation = graphql(`
  mutation CreateShipmentLeg($shipmentLeg: CreateShipmentLegInput!) {
    tms {
      createShipmentLeg(value: $shipmentLeg) {
        id
      }
    }
  }
`);

export const UpdateShipmentLegMutation = graphql(`
  mutation UpdateShipmentLeg($id: ID!, $shipmentLeg: UpdateShipmentLegInput!) {
    tms {
      updateShipmentLeg(id: $id, value: $shipmentLeg) {
        id
      }
    }
  }
`);

export const RemoveShipmentLegMutation = graphql(`
  mutation RemoveShipmentLeg($id: ID!) {
    tms {
      removeShipmentLeg(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
